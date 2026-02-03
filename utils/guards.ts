import { PageProps } from "fresh"
import { SupportedLang } from "./i18n.ts"
import { KayozenState, Theme } from "./interfaces.ts"
import { getSessionUser } from "./middleware.ts"

export const defautGuard = async (
	ctx: PageProps<KayozenState>,
) => {
	const dbUser = await getSessionUser(ctx.req)

	if (!dbUser?.email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}

	return { dbUser }
}

export const userGuard = async (
	ctx: PageProps<KayozenState>,
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
