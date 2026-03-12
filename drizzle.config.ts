import type { Config } from "drizzle-kit"
import { getEnvVar } from "./utils/env.ts"

export default {
	schema: "./utils/db/schema",
	out: "./utils/db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: getEnvVar("DATABASE_URL")!,
	},
} satisfies Config
