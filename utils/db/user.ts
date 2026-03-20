import { db } from "./index.ts"
import { people } from "./schema/people.ts"
import { makeUsername } from "../make_username.ts"
import { v1 } from "uuid"
import {
	DbUser,
	GooglePerson,
	KayoPermission,
	KayoPlan,
	School,
} from "../interfaces.ts"
import { and, eq } from "drizzle-orm"
import { personRole } from "./schema/person-role.ts"
import { personSchool } from "./schema/person-school.ts"

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
	return makeDbUser(insertedUser[0])
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

	populateProfessors(user)

	return makeDbUser(user)
}

export const populateProfessors = async (user: any) => {
	await Promise.all(user.schools.map(async (school: School) => {
		school.professors = await db
			.select({
				name: people.name,
				email: people.email,
				fictitious: people.fictitious,
			})
			.from(people)
			.innerJoin(personRole, eq(people.id, personRole.person))
			.innerJoin(personSchool, eq(people.id, personSchool.person))
			.where(
				and(
					eq(personRole.role, "teacher"),
					eq(personSchool.school, school.id),
				),
			)
	}))
}

export const makeDbUser = (user: any): DbUser => {
	const dbUser: DbUser = {
		...user,
		plan: user.plan as KayoPlan,
		email: user.email!,
		permission: user.permission! as KayoPermission,
		createdAt: new Date(user.createdAt!),
	}
	return dbUser
}
