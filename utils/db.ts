import { Pool } from "@db/postgres"
import { makeUsername } from "./make_username.ts"
import { DbUser, GoogleUser } from "./interfaces.ts"

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

export async function saveUser(user: GoogleUser): Promise<DbUser> {
	const client = await pool.connect()
	let dbUser: DbUser
	try {
		const qObj = await client.queryObject<DbUser>(
			"INSERT INTO users (username, name, email, google_picture) VALUES ($1, $2, $3, $4)",
			[makeUsername(10), user.name, user.email, user.picture],
		)
		dbUser = qObj.rows[0]
	} finally {
		client.release()
	}
	return dbUser
}

export async function getUserByEmail(email: string): Promise<DbUser> {
	const client = await pool.connect()
	let dbUser: DbUser
	try {
		const qObj = await client.queryObject<DbUser>(
			"SELECT * from users WHERE email = $1",
			[email],
		)
		dbUser = qObj.rows[0]
	} finally {
		client.release()
	}
	return dbUser
}
