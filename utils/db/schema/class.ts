import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { schools } from "./schools.ts"

export const classTable = pgTable("class", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
	school: varchar("person", { length: 36 })
		.references(() => schools.id),
})
