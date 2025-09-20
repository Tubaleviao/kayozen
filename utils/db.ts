import { Pool, QueryObjectResult } from "@db/postgres"
import { makeUsername } from "./make_username.ts"
import { DbRole, DbUser, GoogleUser, School } from "./interfaces.ts"
import { v1 } from "jsr:@std/uuid"
import { Role } from "./constants.ts"

const DB_URL = Deno.env.get("DATABASE_URL") ??
	"postgres://tuba:rato12@localhost:5432/kayozen"

const pool = new Pool(DB_URL, 3, true)

export async function query(sql: string, params?: unknown[]) {
	const client = await pool.connect()
	try {
		return await client.queryObject(sql, params)
	} finally {
		client.release()
	}
}

export async function saveUser(user: GoogleUser): Promise<DbUser | undefined> {
	const client = await pool.connect()
	let qObj: QueryObjectResult
	try {
		qObj = await client.queryObject(
			"INSERT INTO people (id, username, name, email, google_picture) VALUES ($1, $2, $3, $4, $5)",
			[v1.generate(), makeUsername(10), user.name, user.email, user.picture],
		)
	} finally {
		client.release()
	}
	if (qObj.query.result_type === 1) return await getUserByEmail(user.email)
	else console.error("Error trying to insert user")
}

export async function getUserByEmail(email: string): Promise<DbUser> {
	const client = await pool.connect()
	let dbUser: DbUser
	try {
		const person = await client.queryObject<DbUser>(
			"SELECT * from people WHERE email = $1",
			[email],
		)
		dbUser = person.rows[0]
		if (dbUser) {
			const roles = await client.queryObject<DbRole>(
				"SELECT * from person_role WHERE person = $1",
				[dbUser.id],
			)
			dbUser.roles = roles.rows
			const schools = await client.queryObject<School>(
				"SELECT * from schools WHERE owner_id = $1",
				[dbUser.id],
			)
			dbUser.schools = schools.rows
			//console.log(schools.rows)
		}
	} finally {
		client.release()
	}
	return dbUser
}
