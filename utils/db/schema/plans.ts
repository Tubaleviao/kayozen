import { pgTable } from "drizzle-orm/pg-core/table"
import { serial } from "drizzle-orm/pg-core"
import { varchar } from "drizzle-orm/pg-core"

export const plans = pgTable("plans", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 50 }).notNull().unique(),
})
