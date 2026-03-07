import { Context } from "fresh"
import { SupportedLang } from "./i18n.ts"
import { KayozenState, Theme } from "./interfaces.ts"
import { getSessionUser } from "./middleware.ts"
import { UnauthorizedError } from "./errors.ts"

export const defautGuard = async (
	ctx: Context<KayozenState>,
) => {
	let dbUser

	try {
		dbUser = await getSessionUser(ctx.req)

		if (!dbUser?.email) {
			return new Response(
				JSON.stringify({
					error: "User without email is not authorized to login",
				}),
				{ status: 401, headers: { "Location": "/" } },
			)
		}
	} catch (e) {
		return new Response(JSON.stringify({ error: "User not found" }), {
			status: 302,
			headers: { "Location": "/" },
		})
	}

	return { dbUser }
}

export const adminGuard = async (ctx: Context<KayozenState>) => {
	const dbUser = await getSessionUser(ctx.req)
	if (dbUser?.permission !== "admin") {
		throw new UnauthorizedError()
	}
	return {}
}

export const userGuard = async (
	ctx: Context<KayozenState>,
) => {
	const dbUser = await getSessionUser(ctx.req)
	return { dbUser }
}

export const isLang = (val: unknown): val is SupportedLang => {
	return (val === "pt" || val === "en")
}

export const isTheme = (val: unknown): val is Theme => {
	return (val === "dark" || val === "light")
}
