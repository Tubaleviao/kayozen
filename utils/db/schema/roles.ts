import { pgEnum, pgTable, serial } from "drizzle-orm/pg-core"

export const rolesEnum = pgEnum("roles_type", ["student", "teacher", "coordinator"])

export const roles = pgTable("roles", {
	id: serial("id").primaryKey(),
	name: rolesEnum().notNull().unique(),
})
