import { Pool } from "@db/postgres"

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

export async function saveUser(user: any) {
	const client = await pool.connect()
	try {
		return await client.queryObject<any>(
			"INSERT INTO users (username, email, picture) VALUES ($1, $2, $3)",
			[user.name, user.email, user.picture],
		)
	} finally {
		client.release()
	}
}

export async function getUserByEmail(email: string) {
	const client = await pool.connect()
	try {
		return await client.queryObject<any>(
			"SELECT username, email, picture from users WHERE email = $1",
			[email],
		)
	} finally {
		client.release()
	}
}
