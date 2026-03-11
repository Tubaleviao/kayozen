import { convertUser, db } from "./index.ts"
import { people } from "./schema/people.ts"
import { makeUsername } from "../make_username.ts"
import { v1 } from "uuid"
import { DbUser, GooglePerson } from "../interfaces.ts"

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

	const person = await db.query.people.findMany({
		where: { email },
		with: {
			roles: true,
			schools: true
		}
	})

	const user = person[0]
	if (!user) return undefined

	return convertUser(user)
}