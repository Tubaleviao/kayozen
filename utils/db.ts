import { Pool, QueryObjectResult } from "@db/postgres"
import { makeUsername } from "./make_username.ts"
import { DbRole, DbUser, GooglePerson, School } from "./interfaces.ts"
import { v1 } from "jsr:@std/uuid"
import { DB_TIMEOUT } from "./constants.ts"

const DB_URL = Deno.env.get("DATABASE_URL") ??
	"postgres://tuba:rato12@localhost:5432/kayozen?connect_timeout=3"

export class DbGateway {
	private pool = new Pool(DB_URL, 3, true)
	dbUser: DbUser | undefined

	private safeConnect(timeoutMs = DB_TIMEOUT) {
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error("DBConnectionTimeout")), timeoutMs)
		)
		const connect = this.pool.connect()
		return Promise.race([connect, timeout]) as Promise<
			ReturnType<typeof this.pool.connect>
		>
	}

	async query(sql: string, params?: unknown[]) {
		const client = await this.safeConnect()
		const dbObj = await client.queryObject(sql, params)
		client.release()
		return dbObj
	}

	async saveUser(user: GooglePerson): Promise<DbUser | undefined> {
		const client = await this.safeConnect()
		const email = user.emailAddresses?.[0].value
		if (email) {
			let qObj: QueryObjectResult
			qObj = await client.queryObject(
				"INSERT INTO people (id, username, name, email, google_picture) VALUES ($1, $2, $3, $4, $5)",
				[
					v1.generate(),
					makeUsername(10),
					user.names?.[0].displayName,
					email,
					user.photos?.[0].url,
				],
			)
			client.release()
			if (qObj.query.result_type === 1) {
				return await this.getUserByEmail(email)
			} else console.error("Error trying to insert user")
		}
	}

	async getUserByEmail(email: string): Promise<DbUser | undefined> {
		console.log("Getting User By Email from DB...")
		let client
		try {
			client = await this.safeConnect()
			const person = await client.queryObject<DbUser>(
				"SELECT * from people WHERE email = $1",
				[email],
			)
			const user = person.rows[0]
			if (!user) return undefined

			const roles = await client.queryObject<DbRole>(
				"SELECT * from person_role WHERE person = $1",
				[user.id],
			)
			user.roles = roles.rows

			const schools = await client.queryObject<School>(
				"SELECT * from schools WHERE owner_id = $1",
				[user.id],
			)
			user.schools = schools.rows

			return user
		} catch (err) {
			console.error("DB error in getUserByEmail:", err)
			throw err
		} finally {
			client?.release()
		}
	}
}

export const db = new DbGateway()
