import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core"
import { subject } from "./subjects.ts"
import { schools } from "./schools.ts"

export const lecture = pgTable("lecture", {
	id: serial("id").primaryKey(),

	subject: integer("subject")
		.notNull()
		.references(() => subject.id),

	school: varchar("school", { length: 36 })
		.notNull()
		.references(() => schools.id),

	startTime: timestamp("start_time").notNull(),

	endTime: timestamp("end_time").notNull(),
})
