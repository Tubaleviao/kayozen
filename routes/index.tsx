import { Context } from "fresh"
import Footer from "../islands/Footer.tsx"
import Main from "../islands/Main.tsx"
import Navbar from "../islands/Navbar.tsx"
import { define } from "../utils.ts"
import { KayozenState } from "../utils/interfaces.ts"
import { getCookieValue } from "../utils/pureFunctions.ts"
import { getSessionUser } from "../utils/middleware.ts"

export const handler = {
	async GET(ctx: Context<KayozenState>) {
		const cookie = ctx.req.headers.get("cookie")
		const error = getCookieValue(cookie, "kayoerror")

		if (error) ctx.state.error = error
		else delete ctx.state.error

		let dbUser
		try {
			dbUser = await getSessionUser(ctx.req)

			if (dbUser?.email) {
				return new Response(null, {
					status: 302,
					headers: {
						Location: "/dashboard",
					},
				})
			}
		} catch (e: any) {
			console.error(e.message)
		}

		return {}
	},
}

export default define.page(function Home({ state }) {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar state={state} />
			<Main state={state} />
			<Footer state={state} />
		</div>
	)
})
