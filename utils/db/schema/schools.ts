import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core"
import { people } from "./people.ts"

export const schools = pgTable("schools", {
	id: varchar("id", { length: 36 }).primaryKey(),

	cnpj: varchar("cnpj", { length: 20 }).unique(),

	name: varchar("name", { length: 250 }),

	ownerId: varchar("owner_id", { length: 36 })
		.notNull()
		.references(() => people.id),

	createdAt: timestamp("created_at").defaultNow(),
})
