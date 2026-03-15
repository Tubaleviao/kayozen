import { pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { schools } from "./schools.ts"
import { people } from "./people.ts"

export const personSchool = pgTable("person_school", {
	id: serial("id").primaryKey(),

	school: varchar("school", { length: 36 })
		.notNull()
		.references(() => schools.id),

	person: varchar("person", { length: 36 })
		.notNull()
		.references(() => people.id),
})
