import { PageProps } from "fresh"

import { UnauthorizedError } from "../../utils/errors.ts"
import { db } from "../../utils/db/index.ts"
import { personRole } from "../../utils/db/schema/person-role.ts"
import { Role } from "../../utils/constants.ts"

export const handler = {
	async POST(ctx: PageProps) {
		const form = await ctx.req.formData()
		const role = form.get("role")?.toString() || "coordinator"
		const userId = form.get("id")?.toString()

		if (!userId) {
			throw new UnauthorizedError()
		}

		if (!role) {
			throw new UnauthorizedError("User has no role defined.")
		}

		await db.insert(personRole).values([{ person: userId, role: role as Role }])

		return Response.redirect(new URL("/dashboard", ctx.req.url))
	},
}
