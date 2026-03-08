import { pgTable, serial, varchar } from "drizzle-orm/pg-core"

export const organization = pgTable("organization", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 250 }).notNull().unique(),
})
