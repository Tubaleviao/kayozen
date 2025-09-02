import { Database, PostgresConnector } from 'https://deno.land/x/denodb@v1.4.0/mod.ts'
import { UserModel } from "./models/User.ts"

const connector = new PostgresConnector({
	host: "localhost",
	username: Deno.env.get("DB_USER") || "",
	password: Deno.env.get("DB_PASS") || "",
	database: Deno.env.get("DB_NAME") || "",
})

export const db = new Database(
	connector,
	{ debug: true },
)

db.link([UserModel])
await db.sync({ drop: true })
