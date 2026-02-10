import { verify } from "djwt"
import { JWT_SECRET, PROTECTED_ROUTES } from "./constants.ts"
import { db } from "./db.ts"
import { DbUser, JwtPayload } from "./interfaces.ts"
import { logError } from "./errors.ts"
import { getCookieValue } from "./pureFunctions.ts"
import { isLang, isTheme } from "./guards.ts"
import { handleError } from "./errorHandler.ts"

export async function getSessionUser(
	req: Request,
): Promise<DbUser | undefined> {
	let dbUser
	try {
		const cookie = req.headers.get("cookie")
		if (!cookie) throw new Error("No Cookie")

		const match = cookie.match(/kayotoken=([^;]+)/)
		if (!match) throw new Error("No kayotoken")

		const jwt = match[1]

		const payload: JwtPayload = await verify(jwt, JWT_SECRET)

		dbUser = await db.getUserByEmail(payload.email)
		if (!dbUser?.email) throw new Error("User was deleted")
	} catch (error: any) {
		logError(error)
	}
	return dbUser
}

export const getAppState = async (ctx: any) => {
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
}
