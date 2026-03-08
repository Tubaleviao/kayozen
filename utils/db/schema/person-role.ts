import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core"
import { people } from "./people.ts"
import { roles } from "./roles.ts"

export const personRole = pgTable("person_role", {
	id: serial("id").primaryKey(),

	person: varchar("person", { length: 36 })
		.notNull()
		.references(() => people.id),

	role: varchar("role", { length: 100 })
		.notNull()
		.references(() => roles.name),

	enrolled: timestamp("enrolled").defaultNow(),

	unenrolled: timestamp("unenrolled"),
})
