import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core"
import { people } from "./people.ts"
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
