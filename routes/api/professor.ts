import { db } from "../../utils/db.ts"
import { makeUsername } from "../../utils/make_username.ts"
import { v1 } from "uuid"
import { logError } from "../../utils/errors.ts"
import { PageProps } from "fresh"

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

		try {
			// insert person_role, person_school
			const personId = v1.generate()

			await db.query(
				"INSERT INTO people (id, username, name, email, fictitious) VALUES ($1, $2, $3, $4, $5)",
				[personId, makeUsername(), name, email, true],
			)

			await db.query(
				"INSERT INTO subject (name) VALUES ($1)",
				[subject],
			)

			await db.query(
				"INSERT INTO person_role (person, role) VALUES ($1, $2)",
				[personId, "teacher"],
			)
		} catch (err) {
			if (String(err).includes("duplicate key")) {
				return new Response(JSON.stringify({ error: "Email already exists" }), {
					status: 400,
				})
			}
			logError(err)
			return new Response(JSON.stringify({ error: "Internal error" }), {
				status: 500,
			})
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
		})
	},

	GET(_ctx: PageProps) {
		return {}
	},
}
