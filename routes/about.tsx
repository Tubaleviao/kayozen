import { PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import Footer from "../islands/Footer.tsx"
import AboutContent from "../islands/AboutContent.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { userGuard } from "../utils/guards.ts"

export const handler = userGuard

export default function AboutPage({ data }: PageProps<KayozenState>) {
	return (
		<div class="flex flex-col min-h-screen bg-kayozen-light-bg dark:bg-kayozen-dark-bg text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar user={data?.dbUser} />

			<main class="flex-grow max-w-screen-lg mx-auto px-4 py-12 animate-fadeIn">
				<AboutContent />
			</main>

			<Footer />
		</div>
	)
}
