import { db } from "./index.ts"
import { people } from "./schema/people.ts"
import { makeUsername } from "../make_username.ts"
import { v1 } from "uuid"
import {
	DbUser,
	GooglePerson,
	KayoPermission,
	KayoPlan,
} from "../interfaces.ts"

export async function saveUser(
	user: GooglePerson,
): Promise<DbUser | undefined> {
	const newUser = {
		id: v1.generate().toString(),
		username: makeUsername(10),
		name: user.names?.[0].displayName || "",
		email: user.emailAddresses?.[0].value,
		googlePicture: user.photos?.[0].url,
	}
	const insertedUser = await db.insert(people).values(newUser).returning()
	return convertUser(insertedUser[0])
}

export async function getUserByEmail(
	email: string,
): Promise<DbUser | undefined> {
	const person = await db.query.people.findMany({
		where: { email },
		with: {
			roles: true,
			schools: true,
		},
	})

	const user = person[0]
	if (!user) return undefined

	return convertUser(user)
}

export const convertUser = (user: typeof people.$inferInsert): DbUser => {
	const dbUser: DbUser = {
		...user,
		plan: user.plan as KayoPlan,
		email: user.email!,
		permission: user.permission! as KayoPermission,
		createdAt: new Date(user.createdAt!),
	}
	return dbUser
}
