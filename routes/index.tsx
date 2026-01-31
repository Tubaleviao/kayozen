import { Handlers, PageProps } from "$fresh/server.ts"
import Footer from "../islands/Footer.tsx"
import Main from "../islands/Main.tsx"
import Navbar from "../islands/Navbar.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { getSessionUser } from "../utils/middleware.ts"

export const handler: Handlers = {
	async GET(req, ctx) {
		const dbUser = await getSessionUser(req)

		if (dbUser?.email) {
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/dashboard",
				},
			})
		}

		return await ctx.render()
	},
}

export default function Home({ state }: PageProps) {
	const { dbUser }: Partial<KayozenState> = state
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar user={dbUser} />
			<Main />
			<Footer />
		</div>
	)
}
