import { PageProps } from "fresh"
import Footer from "../islands/Footer.tsx"
import Main from "../islands/Main.tsx"
import Navbar from "../islands/Navbar.tsx"
import { getSessionUser } from "../utils/middleware.ts"
import { define } from "../utils.ts"

export const handler = {
	async GET(ctx: PageProps) {
		const dbUser = await getSessionUser(ctx.req)

		if (dbUser?.email) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/dashboard",
				},
			})
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
