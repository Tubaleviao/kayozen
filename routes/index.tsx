import { PageProps } from "$fresh/server.ts"
import Footer from "../islands/Footer.tsx"
import Main from "../islands/Main.tsx"
import Navbar from "../islands/Navbar.tsx"
import { KayozenState } from "../utils/interfaces.ts"

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
