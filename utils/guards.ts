import { FreshContext } from "$fresh/server.ts"
import { SupportedLang } from "./i18n.ts"
import { Theme } from "./interfaces.ts"
import { getSessionUser } from "./middleware.ts"

export const defautGuard = async (
	req: Request,
	ctx: FreshContext,
): Promise<Response> => {
	const dbUser = await getSessionUser(req)

	if (!dbUser?.email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}

	const resp = await ctx.render({ dbUser })
	return resp
}

export const isLang = (val: unknown): val is SupportedLang => {
	return (val === "pt" || val === "en")
}

export const isTheme = (val: unknown): val is Theme => {
	return (val === "dark" || val === "light")
}
