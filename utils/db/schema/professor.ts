import { people } from "./people.ts"
import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core"
import { subject } from "./subjects.ts"

export const professorSubject = pgTable("professor_subject", {
	id: serial("id").primaryKey(),
	professorId: varchar("professor_id", { length: 36 })
		.notNull()
		.references(() => people.id),

	subjectId: integer("subject_id")
		.notNull()
		.references(() => subject.id),
})
