import Navbar from "../islands/Navbar.tsx"
import Footer from "../islands/Footer.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { adminGuard } from "../utils/guards.ts"

export const handler = adminGuard

export default function ManagePage({ state }: { state: KayozenState }) {
	return (
		<div class="flex flex-col min-h-screen bg-kayozen-light-bg dark:bg-kayozen-dark-bg text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar state={state} />

			<main class="grow max-w-(--breakpoint-lg) mx-auto px-4 py-12 animate-fadeIn">
				test
			</main>

			<Footer state={state} />
		</div>
	)
}
