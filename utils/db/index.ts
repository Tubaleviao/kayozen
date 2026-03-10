import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import { DbUser, GooglePerson, KayoPermission, KayoPlan } from "../interfaces.ts"
import { people } from "./schema/people.ts"
import { eq } from "drizzle-orm"
import { makeUsername } from "../make_username.ts"
import { v1 } from "uuid"

const client = postgres(Deno.env.get("DATABASE_URL")!)

export const db = drizzle(client)

// Database Functions
export const getUserByEmail = async (email: string): Promise<DbUser | undefined> => {
    const data = await db
        .select()
        .from(people)
        .where(eq(people.email, email))
    const foundUser = data[0]
    return convertUser(foundUser)
}

export const saveUser = async (user: GooglePerson): Promise<DbUser | undefined> => {
    const newUser = {
        id: v1.generate().toString(), 
        username: makeUsername(10),
        name: user.names?.[0].displayName || '',
        email: user.emailAddresses?.[0].value,
        googlePicture: user.photos?.[0].url,
    }
    const insertedUser = await db.insert(people).values(newUser).returning()
    return convertUser(insertedUser[0])
}

const convertUser = (user: typeof people.$inferInsert): DbUser => {
    const dbUser: DbUser = {
        ...user, 
        plan: user.plan as KayoPlan,
        email: user.email!,
        permission: user.permission! as KayoPermission,
        createdAt: new Date(user.createdAt!)
    }
    return dbUser
}