// routes/api/schools.ts
import { Handlers } from "$fresh/server.ts"
import { v1 } from "jsr:@std/uuid"
import { DbUser } from "../../../utils/interfaces.ts"
import { db } from "../../../utils/db.ts"

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
		const name = (body.name ?? "Your School").trim()
		if (!name) {
			return new Response(JSON.stringify({ error: "Name required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		const schoolId = v1.generate()
		await db.query(
			"INSERT INTO schools (id, name, owner_id) VALUES ($1, $2, $3)", // RETURNING ID
			[schoolId, name, user.id],
		) as any

		await db.query(
			"INSERT INTO person_school (school, person) VALUES ($1, $2)",
			[schoolId, user.id],
		) as any

		return new Response(JSON.stringify({ id: schoolId }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	},
}
