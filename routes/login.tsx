import { Handlers } from "$fresh/server.ts"
import Footer from "../islands/Footer.tsx"
import LoginBox from "../islands/LoginBox.tsx"
import Navbar from "../islands/Navbar.tsx"

export const handler: Handlers = {
	GET(_req, ctx) {
		return ctx.render({})
	},
}

export default function LoginPage() {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar />

			<div class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
				<LoginBox />
			</div>

			<Footer />
		</div>
	)
}
