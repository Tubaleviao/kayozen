import { drizzle } from "drizzle-orm/postgres-js"
import { relations } from "./relations.ts"

export const db = drizzle(Deno.env.get("DATABASE_URL")!, { relations })
