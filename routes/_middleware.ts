import { verify } from "djwt"
import { define } from "../utils.ts"
import { JWT_SECRET, PROTECTED_ROUTES } from "../utils/constants.ts"
import { isLang, isTheme } from "../utils/guards.ts"
import { DbUser, JwtPayload } from "../utils/interfaces.ts"
import { getCookieValue } from "../utils/pureFunctions.ts"
import { handleError } from "../utils/errorHandler.ts"
import { db } from "../utils/db.ts"

export const middleware = define.middleware(async ctx => {
	const { req } = ctx
	const cookie = req.headers.get("cookie")
	const potentialTheme = getCookieValue(cookie, "kayotheme") ?? "light"
	const potentialLang = getCookieValue(cookie, "kayolang") ?? "pt"
	const jwt = getCookieValue(cookie, "kayotoken")
	let dbUser: DbUser | undefined

	if (isLang(potentialLang)) ctx.state.lang = potentialLang
	if (isTheme(potentialTheme)) ctx.state.theme = potentialTheme

	const failedHeaders = {
		"Set-Cookie": "kayotoken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
	}
	ctx.state.dbUser = dbUser

	const url = new URL(req.url)
	const isProtected = PROTECTED_ROUTES.some((route) =>
		url.pathname.startsWith(route)
	)

	if (jwt && isProtected) {
		try {
			const payload: JwtPayload = await verify(jwt, JWT_SECRET)
			const user = await db.getUserByEmail(payload.email)
			if (!user) {
				return handleError(new Error("Unauthorized"), req, failedHeaders)
			}
			dbUser = user
		} catch (error: any) {
			return handleError(error, req, failedHeaders)
		}
	}
	
	return await ctx.next()
})
