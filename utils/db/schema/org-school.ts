import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { organization } from "./organization.ts"
import { schools } from "./schools.ts"

export const orgSchool = pgTable("org_school", {
	id: serial("id").primaryKey(),

	organization: integer("organization")
		.notNull()
		.references(() => organization.id),

	school: varchar("school", { length: 36 })
		.notNull()
		.references(() => schools.id),
})
