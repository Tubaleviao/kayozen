import { verify } from "djwt"
import type {
	DbUser,
	FreshContext,
	JwtPayload,
	Theme,
} from "../utils/interfaces.ts"
import { JWT_SECRET, PROTECTED_ROUTES } from "../utils/constants.ts"
import { db } from "../utils/db.ts"
import { handleError } from "../utils/errorHandler.ts"
import { isLang, isTheme } from "../utils/guards.ts"
import { SupportedLang } from "../utils/i18n.ts"
import { getCookieValue } from "../utils/pureFunctions.ts"

export async function handler(req: Request, ctx: FreshContext) {
	const cookie = req.headers.get("cookie")
	const potentialTheme = getCookieValue(cookie, "kayotheme") ?? "light"
	const potentialLang = getCookieValue(cookie, "kayolang") ?? "pt"
	const jwt = getCookieValue(cookie, "kayotoken")
	let lang: SupportedLang | undefined, theme: Theme | undefined
	let dbUser: DbUser | undefined

	if (isLang(potentialLang)) lang = potentialLang
	if (isTheme(potentialTheme)) theme = potentialTheme

	const failedHeaders = {
		"Set-Cookie": "kayotoken=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
	}
	ctx.state = { theme, lang, dbUser }

	const url = new URL(req.url)
	const isProtected = PROTECTED_ROUTES.some((route) =>
		url.pathname.startsWith(route)
	)

	if (jwt && isProtected) {
		try {
			const payload: JwtPayload = await verify(jwt, JWT_SECRET)
			const user = await db.getUserByEmail(payload.email);
			if (!user) {
				return handleError(new Error("Unauthorized"), req, failedHeaders);
			}
			dbUser = user
		} catch (error: any) {
			return handleError(error, req, failedHeaders)
		}
	}

	try {
		return await ctx.next()
	} catch (error: any) {
		return handleError(error, req)
	}
}
