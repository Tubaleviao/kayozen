import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core"
import { people } from "./people.ts"
import { lecture } from "./lecture.ts"


export const lectureEmployee = pgTable("lecture_employee", {
	id: serial("id").primaryKey(),

	lecture: integer("lecture")
		.notNull()
		.references(() => lecture.id),

	employee: varchar("employee", { length: 36 })
		.notNull()
		.references(() => people.id),
})
