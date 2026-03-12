import { verify } from "djwt"
import { JWT_SECRET, PROTECTED_ROUTES } from "./constants.ts"
import { DbUser, JwtPayload } from "./interfaces.ts"
import { logError, UnauthorizedError } from "./errors.ts"
import { getCookieValue } from "./pureFunctions.ts"
import { isLang, isTheme } from "./guards.ts"
import { withErrorHandling } from "./errorHandling.ts"
import { getUserByEmail } from "./db/user.ts"

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

		dbUser = await getUserByEmail(payload.email)
		if (!dbUser?.email) throw new Error("User was deleted")
	} catch (error: any) {
		logError(error)
	}
	return dbUser
}

export const getAppState = async (ctx: any) => {
	const { req } = ctx
	const cookie = req.headers.get("cookie")
	const potentialTheme = getCookieValue(cookie, "kayotheme")
	const potentialLang = getCookieValue(cookie, "kayolang") ?? "pt"
	const jwt = getCookieValue(cookie, "kayotoken")
	let dbUser: DbUser | undefined

	if (isLang(potentialLang)) ctx.state.lang = potentialLang
	if (isTheme(potentialTheme)) ctx.state.theme = potentialTheme

	const url = new URL(req.url)
	const isProtected = PROTECTED_ROUTES.some((route) =>
		url.pathname.startsWith(route)
	)

	if (jwt && isProtected) {
		try {
			const payload: JwtPayload = await verify(jwt, JWT_SECRET)
			const user = await getUserByEmail(payload.email)
			if (!user) {
				throw new UnauthorizedError()
			}
			dbUser = user
		} catch (e: any) {
			return new Response(null, {
				status: 302,
				headers: {
					"Location": "/",
					"Set-Cookie": `kayoerror=${e.message}; Path=/; Max-Age=5`,
				},
			})
		}
	}

	ctx.state.dbUser = dbUser

	return await ctx.next()
}

export const errorHandling = (ctx: any) => {
	return withErrorHandling(ctx, () => ctx.next())
}
