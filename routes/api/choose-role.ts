import { Handlers } from "fresh/server.ts"
import { db } from "../../utils/db.ts"

export const handler: Handlers = {
	async POST(req, _ctx) {
		const form = await req.formData()
		const role = form.get("role")?.toString()
		const userId = form.get("id")?.toString()

		if (!role) {
			return new Response("Role required", { status: 400 })
		}

		if (!userId) {
			return new Response("Unauthorized", { status: 401 })
		}

		await db.query(
			"insert into person_role (person, role, enrolled) values ($1, $2, NOW())",
			[
				userId,
				role,
			],
		)

		return Response.redirect(new URL("/dashboard", req.url))
	},
}
