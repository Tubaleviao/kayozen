import { db } from "../../../utils/db.ts"
import { compare } from "bcrypt"
import { getAuthHeader } from "../../../utils/getAuthHeader.ts"
import { PageProps } from "fresh"

export const handler = async (ctx: PageProps) => {
	const form = await ctx.req.formData()
	console.log(form, form.get("remember"))
	const userEmail = form.get("email")?.toString() || ""
	const user = await db.getUserByEmail(userEmail)

	if (!user) return new Response("User not found", { status: 400 })

	const isCorrect = await compare(
		form.get("password")?.toString() || "",
		user.password_hash || "",
	)

	if (!isCorrect) return new Response("Wrong Password", { status: 400 })

	const headers = await getAuthHeader(user.name, user.email)
	return new Response(null, { status: 307, headers })
}
