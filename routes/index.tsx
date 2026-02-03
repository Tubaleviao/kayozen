import { PageProps } from "fresh"
import Footer from "../islands/Footer.tsx"
import Main from "../islands/Main.tsx"
import Navbar from "../islands/Navbar.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { getSessionUser } from "../utils/middleware.ts"

export const handler= {
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

export default function Home({ data }: PageProps<KayozenState>) {
	const { dbUser } = data
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar user={dbUser} />
			<Main />
			<Footer />
		</div>
	)
}
