import { db } from "./index.ts"
import { people } from "./schema/people.ts"
import { makeUsername } from "../make_username.ts"
import { v1 } from "uuid"
import { DbUser, GooglePerson } from "../interfaces.ts"
import { eq } from "drizzle-orm"
import { personRole } from "./schema/person-role.ts"
import { schools } from "./schema/schools.ts"

export async function saveUser(user: GooglePerson): Promise<DbUser | undefined> {
	const email = user.emailAddresses?.[0].value
	if (!email) return undefined

	const id = v1.generate().toString()

	await db.insert(people).values({
		id,
		username: makeUsername(10),
		name: user.names?.[0].displayName ?? "",
		email,
		googlePicture: user.photos?.[0].url,
	})

	return getUserByEmail(email)
}

export async function getUserByEmail(email: string): Promise<DbUser | undefined> {

	const person = await db
		.select()
		.from(people)
		.where(eq(people.email, email))

	const user = person[0]
	if (!user) return undefined

	const roles = await db
		.select()
		.from(personRole)
		.where(eq(personRole.person, user.id))

	const userSchools = await db
		.select()
		.from(schools)
		.where(eq(schools.ownerId, user.id))

	return {
		...user,
		roles,
		schools: userSchools,
	}
}