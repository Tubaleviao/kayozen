import { hashSync } from "bcrypt"
import { db } from "../../utils/db.ts"
import { makeUsername } from "../../utils/make_username.ts"
import { v1 } from "uuid"
import { getAuthHeader } from "../../utils/getAuthHeader.ts"
import { ValidationError } from "../../utils/errors.ts"
import { PageProps } from "fresh"

export const handler = {
	async POST(ctx: PageProps) {
		const form = await ctx.req.json()
		const { name, email, password, confirmPassword, acceptTerms } = form

		if (!name || !email || !password || !confirmPassword) {
			throw new ValidationError(
				"Missing one of these fields: name, email, password, confirmPassword or acceptTerms",
			)
		}

		if (password !== confirmPassword) {
			throw new ValidationError("Passwords do not match")
		}

		if (!acceptTerms) {
			throw new ValidationError("Terms not accepted")
		}

		const passwordHash = hashSync(password)

		console.log("Inserting into database")

		await db.query(
			"INSERT INTO people (id, username, name, email, password_hash) VALUES ($1, $2, $3, $4, $5)",
			[v1.generate(), makeUsername(), name, email, passwordHash],
		)
		const headers = await getAuthHeader(name, email)

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers,
		})
	},

	GET(_ctx: PageProps) {
		return {}
	},
}
