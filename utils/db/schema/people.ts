import {
	pgTable,
	varchar,
	boolean,
	timestamp
} from "drizzle-orm/pg-core"

export const people = pgTable("people", {
	id: varchar("id", { length: 36 }).primaryKey(),
	name: varchar("name", { length: 250 }).notNull(),
	username: varchar("username", { length: 50 }).notNull().unique(),
	email: varchar("email", { length: 100 }),
	passwordHash: varchar("password_hash"),
	plan: varchar("plan", { length: 50 }).notNull().default("free"),
	permission: varchar("permission", { length: 100 }).notNull().default("user"),
	fictitious: boolean("fictitious").notNull().default(false),
	cpf: varchar("cpf", { length: 20 }),
	googlePicture: varchar("google_picture"),
	createdAt: timestamp("created_at").defaultNow(),
})
