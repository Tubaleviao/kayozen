import { FreshContext } from "$fresh/server.ts"

export async function handler(req: Request, ctx: FreshContext) {
	const theme = req.headers.get("cookie")?.match(/kayotheme=(dark|light)/)?.[1]
	const lang = req.headers.get("cookie")?.match(/kayolang=([a-zA-Z-]+)/)?.[1]
	ctx.state = { theme, lang }
	return await ctx.next()
}
