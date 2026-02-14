import { db } from "../../../utils/db.ts"
import { compare } from "bcrypt"
import { getAuthHeader } from "../../../utils/getAuthHeader.ts"
import { PageProps } from "fresh"

export const handler = async (ctx: PageProps) => {
	const body = await ctx.req.json()
	const user = await db.getUserByEmail(body.email)

	if (!user) {
		return new Response(JSON.stringify({ error: "User not found" }), {
			status: 400,
		})
	}

	const isCorrect = await compare(
		body.password,
		user.password_hash || "",
	)

	if (!isCorrect) {
		return new Response(JSON.stringify({ error: "Wrong Password" }), {
			status: 400,
		})
	}

	const headers = await getAuthHeader(user.name, user.email)
	return new Response(JSON.stringify({ redirect: "/dashboard" }), {
		status: 200,
		headers,
	})
}
