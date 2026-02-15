import { PageProps } from "fresh"
import { db } from "../../utils/db.ts"
import { UnauthorizedError } from "../../utils/errors.ts"

export const handler = {
	async POST(ctx: PageProps) {
		const form = await ctx.req.formData()
		const role = form.get("role")?.toString()
		const userId = form.get("id")?.toString()

		if (!userId) {
			throw new UnauthorizedError()
		}

		if (!role) {
			throw new UnauthorizedError("User has no role defined.")
		}

		await db.query(
			"insert into person_role (person, role, enrolled) values ($1, $2, NOW())",
			[
				userId,
				role,
			],
		)

		return Response.redirect(new URL("/dashboard", ctx.req.url))
	},
}
