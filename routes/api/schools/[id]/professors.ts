import { PageProps } from "fresh"
import { and, eq } from "drizzle-orm"
import { db } from "../../../../utils/db/index.ts"
import { people } from "../../../../utils/db/schema/people.ts"
import { personRole } from "../../../../utils/db/schema/person-role.ts"
import { personSchool } from "../../../../utils/db/schema/person-school.ts"

export const handler = {
	async GET(ctx: PageProps) {
		const { id } = ctx.params

		const result = await db
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
					eq(personSchool.school, id),
				),
			)

		return new Response(JSON.stringify(result), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	},
}
