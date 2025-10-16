import { verify } from "djwt"
import type { DbUser, JwtPayload, FreshContext, Theme } from "../utils/interfaces.ts"
import { JWT_SECRET } from "../utils/constants.ts"
import { db } from "../utils/db.ts"
import { handleError } from "../utils/errorHandler.ts"
import { isLang, isTheme } from "../utils/guards.ts"
import { SupportedLang } from "../utils/i18n.ts"
import { getCookieValue } from "../utils/pureFunctions.ts"

export async function handler(req: Request, ctx: FreshContext) {
	const cookie = req.headers.get("cookie")
	const potentialTheme = getCookieValue(cookie, "kayotheme") ?? "light" // cookie?.match(/kayotheme=(dark|light)/)?.[1] ?? "light"
	const potentialLang = getCookieValue(cookie, "kayolang") ?? "pt" // cookie?.match(/kayolang=([a-zA-Z-]+)/)?.[1] ?? "pt"
	const jwt = getCookieValue(cookie, "kayotoken") // cookie?.match(/auth_token=([^;]+)/)?.[1]
	let lang: SupportedLang | undefined, theme: Theme | undefined
	let dbUser: DbUser | undefined

	if(isLang(potentialLang)) lang = potentialLang
	if(isTheme(potentialTheme)) theme = potentialTheme

	if (jwt) {
		try {
			const payload: JwtPayload = await verify(jwt, JWT_SECRET)
			dbUser = await db.getUserByEmail(payload.email)
		} catch (error: any) {
			const headers = {
				"Set-Cookie":
					"auth_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
			}
			ctx.state = { theme, lang }
			return handleError( error, req, headers )
		}
	}
	ctx.state = { theme, lang, dbUser }

	try {
		return await ctx.next()
	} catch (error: any) {
		return handleError(error, req)
	}
}
