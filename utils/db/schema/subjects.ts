import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { schools } from "./schools.ts"

export const subject = pgTable("subject", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull().unique(),
	school: varchar("school", { length: 36 }).references(() => schools.id),
})
