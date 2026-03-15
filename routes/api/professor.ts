import { makeUsername } from "../../utils/make_username.ts"
import { v1 } from "uuid"
import { PageProps } from "fresh"
import { people } from "../../utils/db/schema/people.ts"
import { subject as subjectSchema } from "../../utils/db/schema/subjects.ts"
import { db } from "../../utils/db/index.ts"
import { eq } from "drizzle-orm"
import { professorSubject } from "../../utils/db/schema/professor-subject.ts"
import { personRole } from "../../utils/db/schema/person-role.ts"
import { personSchool } from "../../utils/db/schema/person-school.ts"

export const handler = { // needs to be protected in the future
	async POST(ctx: PageProps) {
		const form = await ctx.req.json()

		const { name, email, subject, schoolId } = form

		if (!name || !subject || !schoolId) {
			console.error("missing fields", name, subject, schoolId)
			return new Response(JSON.stringify({ error: "Missing fields" }), {
				status: 400,
			})
		}
		const personId = v1.generate().toString()

		await db.insert(people).values({
			id: personId,
			username: makeUsername(),
			name,
			email,
			fictitious: true,
		})

		let existentSubject = await db.select({ id: subjectSchema.id }).from(
			subjectSchema,
		).where(eq(subjectSchema.name, subject))

		if (!existentSubject[0]?.id) {
			existentSubject = await db.insert(subjectSchema).values([{
				name: subject,
			}]).returning()
		}

		await db.insert(professorSubject).values({
			professorId: personId,
			subjectId: existentSubject[0].id,
		})

		await db.insert(personRole).values({ person: personId, role: "teacher" })

		await db.insert(personSchool).values({ person: personId, school: schoolId })

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		})
	},

	GET(_ctx: PageProps) {
		return db.select().from(people).innerJoin(
			personRole,
			eq(people.id, personRole.person),
		).where(eq(personRole.role, "teacher"))
	},
}
