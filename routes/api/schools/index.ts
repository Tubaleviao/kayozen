// routes/api/schools.ts
import { Handlers } from "fresh/server.ts"
import { v1 } from "uuid"
import { db } from "../../../utils/db.ts"

export const handler: Handlers = {
	async POST(req, _ctx) {
		const body = await req.json().catch(() => ({}))
		const { userId, name, cnpj } = body
		if (!userId) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), {
				status: 401,
				headers: { "Content-Type": "application/json" },
			})
		}

		const schoolName = (name ?? "Your School").trim()
		if (!schoolName) {
			return new Response(JSON.stringify({ error: "Name required" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		const schoolId = v1.generate()
		await db.query(
			"INSERT INTO schools (id, name, owner_id, cnpj) VALUES ($1, $2, $3, $4)",
			[schoolId, schoolName, userId, cnpj],
		)

		await db.query(
			"INSERT INTO person_school (school, person) VALUES ($1, $2)",
			[schoolId, userId],
		)

		return new Response(JSON.stringify({ id: schoolId }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	},
}
