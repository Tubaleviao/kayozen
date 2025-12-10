import { FreshContext } from "$fresh/server.ts"
import { db } from "../../../utils/db.ts"
import { compare } from "bcrypt"
import { getAuthHeader } from "../../../utils/getAuthHeader.ts"

export const handler = async (req: Request, _ctx: FreshContext) => {
	const form = await req.formData()
	console.log(form, form.get("remember"))
	const userEmail = form.get('email')?.toString() || ''
	const user = await db.getUserByEmail(userEmail)
	console.log(user)

	if(!user) return new Response("User not found", { status: 400 })

	const isCorrect = await compare(form.get('password')?.toString() || '', user.password_hash || '')

	if(!isCorrect) return new Response("Wrong Password", { status: 400 })

	const headers = await getAuthHeader(user.name, user.email)
	return new Response(null, { status: 307, headers })
}
