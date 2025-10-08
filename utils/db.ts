import { Pool, QueryObjectResult } from "@db/postgres"
import { makeUsername } from "./make_username.ts"
import { DbRole, DbUser, GoogleUser, School } from "./interfaces.ts"
import { v1 } from "jsr:@std/uuid"

const DB_URL = Deno.env.get("DATABASE_URL") ??
	"postgres://tuba:rato12@localhost:5432/kayozen"

export class DbGateway {
	private pool = new Pool(DB_URL, 3, true)
	dbUser: DbUser | undefined

	constructor() {}

	async query(sql: string, params?: unknown[]) {
		const client = await this.pool.connect()
		const dbObj = await client.queryObject(sql, params)
		client.release()
		return dbObj
	}

	async saveUser(user: GoogleUser): Promise<DbUser | undefined> {
		const client = await this.pool.connect()
		let qObj: QueryObjectResult
		qObj = await client.queryObject(
			"INSERT INTO people (id, username, name, email, google_picture) VALUES ($1, $2, $3, $4, $5)",
			[v1.generate(), makeUsername(10), user.name, user.email, user.picture],
		)
		client.release()
		if (qObj.query.result_type === 1) {
			return await this.getUserByEmail(user.email)
		} else console.error("Error trying to insert user")
	}

	async getUserByEmail(email: string): Promise<DbUser> {
		if (this.dbUser && this.dbUser.email === email) return this.dbUser
		const client = await this.pool.connect()
		const person = await client.queryObject<DbUser>(
			"SELECT * from people WHERE email = $1",
			[email],
		)
		this.dbUser = person.rows[0]
		if (this.dbUser) {
			const roles = await this.getRoleByPerson(this.dbUser.id)
			this.dbUser.roles = roles
			const schools = await this.getSchoolByPerson(this.dbUser.id)
			this.dbUser.schools = schools
		}
		client.release()
		return this.dbUser
	}

	async getRoleByPerson(person: string): Promise<DbRole[]> {
		const client = await this.pool.connect()
		const roles = await client.queryObject<DbRole>(
			"SELECT * from person_role WHERE person = $1",
			[person],
		)
		client.release()
		return roles.rows
	}

	async getSchoolByPerson(person: string): Promise<School[]> {
		const client = await this.pool.connect()
		const schools = await client.queryObject<School>(
			"SELECT * from schools WHERE owner_id = $1",
			[person],
		)
		client.release()
		return schools.rows
	}
}

export const db = new DbGateway()
