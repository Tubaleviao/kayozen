// routes/api/schools.ts
import { Handlers } from "$fresh/server.ts"
import { query } from "../../utils/db.ts"
import { DbUser } from "../../utils/interfaces.ts"

export const handler: Handlers = {
	async POST(req, ctx) {
		const user = ctx.state?.dbUser as DbUser
		if (!user) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			})
		}

		const body = await req.json().catch(() => ({}))
		const name = (body.name ?? "").trim()
		if (!name) {
			return new Response(JSON.stringify({ error: "Name required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		const q = await query(
			"INSERT INTO schools (name, owner_id) VALUES ($1, $2) RETURNING id",
			[name, user.id],
		) as any
		const id = q.rows?.[0]?.id

		return new Response(JSON.stringify({ id }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	},
}
