import { v1 } from "uuid"
import { PageProps } from "fresh"
import { UnauthorizedError } from "../../../utils/errors.ts"
import { schools } from "../../../utils/db/schema/schools.ts"
import { db } from "../../../utils/db/index.ts"
import { personSchool } from "../../../utils/db/schema/person-school.ts"

export const handler = {
	async POST(ctx: PageProps) {
		const body = await ctx.req.json().catch(() => ({}))
		const { userId, name, cnpj } = body
		if (!userId) {
			throw new UnauthorizedError()
		}

		const schoolName = (name ?? "Your School").trim()
		if (!schoolName) {
			return new Response(JSON.stringify({ error: "Name required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}
		const schoolId = v1.generate().toString()

		await db.insert(schools).values({ id: schoolId, name: schoolName, ownerId: userId, cnpj })

		await db.insert(personSchool).values({ school: schoolId, person: userId })

		return new Response(JSON.stringify({ id: schoolId }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	},
}
