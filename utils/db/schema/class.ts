import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const classTable = pgTable("class", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull(),
})
