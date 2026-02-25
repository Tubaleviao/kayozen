import Navbar from "../islands/Navbar.tsx"
import Footer from "../islands/Footer.tsx"
import AboutContent from "../islands/AboutContent.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { userGuard } from "../utils/guards.ts"

export const handler = userGuard

export default function AboutPage({ state }: { state: KayozenState }) {
	return (
		<div class="flex flex-col min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
			<Navbar state={state} />

			<main class="grow max-w-(--breakpoint-lg) mx-auto px-4 py-12 animate-fadeIn">
				<AboutContent lang={state.lang} />
			</main>

			<Footer state={state} />
		</div>
	)
}
