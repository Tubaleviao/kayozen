import { drizzle } from "drizzle-orm/postgres-js"
import { relations } from "./relations.ts"
import { getEnvVar } from "../env.ts"
import { DatabaseOfflineError } from "../errors.ts"

const databaseUrl = getEnvVar("DATABASE_URL")

const _db = databaseUrl ? drizzle(databaseUrl, { relations }) : null

export const db: ReturnType<typeof drizzle> = new Proxy({} as any, {
	get(_target, prop) {
		if (!_db) {
			throw new DatabaseOfflineError(
				"Something is wrong with the environment, please come back later.",
			)
		}
		return (_db as any)[prop]
	},
})
