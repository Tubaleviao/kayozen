import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"
import { lecture } from "./lecture.ts"
import { people } from "./people.ts"

export const studentLecture = pgTable("student_lecture", {
	id: serial("id").primaryKey(),

	lecture: integer("lecture")
		.notNull()
		.references(() => lecture.id),

	student: varchar("student", { length: 36 })
		.notNull()
		.references(() => people.id),
})
