import { hashSync } from "bcrypt"
import { makeUsername } from "../../utils/make_username.ts"
import { v1 } from "uuid"
import { getAuthHeader } from "../../utils/getAuthHeader.ts"
import { ValidationError } from "../../utils/errors.ts"
import { PageProps } from "fresh"
import { db } from "../../utils/db/index.ts"
import { people } from "../../utils/db/schema/people.ts"

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

		await db.insert(people).values({ id: v1.generate().toString(), username: makeUsername(), name, email, passwordHash })

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
