import { FreshContext } from "$fresh/server.ts"
import { verify } from "djwt"
import { DbUser, JwtPayload } from "../utils/interfaces.ts"
import { JWT_SECRET } from "../utils/constants.ts"
import { db } from "../utils/db.ts"

export async function handler(req: Request, ctx: FreshContext) {
	const cookie = req.headers.get("cookie")
	const theme = cookie?.match(/kayotheme=(dark|light)/)?.[1]
	const lang = cookie?.match(/kayolang=([a-zA-Z-]+)/)?.[1]
	const jwt = cookie?.match(/auth_token=([^;]+)/)?.[1]
	let dbUser: DbUser | undefined

	if (jwt) {
		try {
			const payload: JwtPayload = await verify(jwt, JWT_SECRET)
			dbUser = await db.getUserByEmail(payload.email)
		} catch (e: any) {
			if (e) console.error(e.message)
			const resp = await ctx.next()
			resp.headers.append(
				"Set-Cookie",
				"auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
			)
			ctx.state = { theme, lang }
			return resp
		}
	}

	ctx.state = { theme, lang, dbUser }

	return await ctx.next()
}
