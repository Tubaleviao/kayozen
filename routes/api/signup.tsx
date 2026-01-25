import { Handlers } from "$fresh/server.ts"
import { hash } from "bcrypt"
import { db } from "../../utils/db.ts"
import { makeUsername } from "../../utils/make_username.ts"
import { v1 } from "uuid"
import { getAuthHeader } from "../../utils/getAuthHeader.ts"
import { logError } from "../../utils/errors.ts"

interface Data {
	error?: string
	success?: boolean
}

export const handler: Handlers<Data> = {
	async POST(req, _ctx) {
		const form = await req.json()

		const { name, email, password, confirmPassword, acceptTerms } = form

		if (!name || !email || !password || !confirmPassword) {
			return new Response(JSON.stringify({ error: "Missing fields" }), {
				status: 400,
			})
		}

		if (password !== confirmPassword) {
			return new Response(JSON.stringify({ error: "Passwords do not match" }), {
				status: 400,
			})
		}

		if (!acceptTerms) {
			return new Response(JSON.stringify({ error: "Terms not accepted" }), {
				status: 400,
			})
		}

		const passwordHash = await hash(password)

		try {
			await db.query(
				"INSERT INTO people (id, username, name, email, password_hash) VALUES ($1, $2, $3, $4, $5)",
				[v1.generate(), makeUsername(), name, email, passwordHash],
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

		const headers = await getAuthHeader(name, email)

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers,
		})
	},

	async GET(_, ctx) {
		return await ctx.render({})
	},
}
