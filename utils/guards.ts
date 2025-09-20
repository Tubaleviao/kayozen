import { FreshContext } from "$fresh/server.ts"
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
