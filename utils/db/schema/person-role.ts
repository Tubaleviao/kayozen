import { pgTable, serial, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { people } from "./people.ts"
import { roles } from "./roles.ts"

export const rolesEnum = pgEnum("roles", ["student", "teacher", "coordinator"]);

export const personRole = pgTable("person_role", {
	id: serial("id").primaryKey(),

	person: varchar("person", { length: 36 })
		.notNull()
		.references(() => people.id),

	role: rolesEnum()
		.notNull()
		.references(() => roles.name),

	enrolled: timestamp("enrolled").defaultNow(),

	unenrolled: timestamp("unenrolled"),
})