import { compareSync } from "bcrypt"
import { getAuthHeader } from "../../../utils/getAuthHeader.ts"
import { PageProps } from "fresh"
import { ValidationError } from "../../../utils/errors.ts"
import { getUserByEmail } from "../../../utils/db/user.ts"

export const handler = async (ctx: PageProps) => {
	const body = await ctx.req.json()
	const user = await getUserByEmail(body.email)

	if (!user) {
		throw new ValidationError("User not found")
	}

	const isCorrect = await compareSync(
		body.password,
		user.passwordHash || "",
	)

	if (!isCorrect) {
		throw new ValidationError("Wrong Password")
	}

	const headers = await getAuthHeader(user.name, user.email)
	return new Response(JSON.stringify({ redirect: "/dashboard" }), {
		status: 200,
		headers,
	})
}
