import { FreshContext } from "$fresh/server.ts"
import { verify } from "djwt"
import { DbUser, JwtPayload } from "../utils/interfaces.ts"
import { JWT_SECRET } from "../utils/constants.ts"
import { db } from "../utils/db.ts"
import { handleError } from "../utils/errorHandler.ts"

export async function handler(req: Request, ctx: FreshContext) {
	const cookie = req.headers.get("cookie")
	const theme = cookie?.match(/kayotheme=(dark|light)/)?.[1]
	const lang = cookie?.match(/kayolang=([a-zA-Z-]+)/)?.[1]
	const jwt = cookie?.match(/kayotoken=([^;]+)/)?.[1]
	let dbUser: DbUser | undefined

	if (jwt) {
		try {
			const payload: JwtPayload = await verify(jwt, JWT_SECRET)
			dbUser = await db.getUserByEmail(payload.email)
		} catch (error: any) {
			handleError(error, req)
			const headers = new Headers({
				"Set-Cookie": "kayotoken=; Path=/; Max-Age=0;",
				"Location": "/",
			})
			return new Response(null, { headers, status: 302 })
		}
	}
	ctx.state = { theme, lang, dbUser }
	return await ctx.next()
}
