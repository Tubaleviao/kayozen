import { and, eq } from "drizzle-orm"
import { db } from "./index.ts"
import { people } from "./schema/people.ts"
import { personRole } from "./schema/person-role.ts"
import { personSchool } from "./schema/person-school.ts"
import { Professor } from "../interfaces.ts"

export async function getSchoolProfessors(
	schoolId: string,
): Promise<Professor[]> {
	const professors = await db
		.select({
			id: people.id,
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
				eq(personSchool.school, schoolId),
			),
		)
	return professors
}
