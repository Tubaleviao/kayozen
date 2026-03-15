import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { people } from "./people.ts"
import { classTable } from "./class.ts"

export const studentClass = pgTable("student_class", {
	id: serial("id").primaryKey(),

	student: varchar("student", { length: 36 })
		.notNull()
		.references(() => people.id),

	class: integer("class")
		.notNull()
		.references(() => classTable.id),

	joined: timestamp("joined").notNull(),

	departed: timestamp("departed"),
})
