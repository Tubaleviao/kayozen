import Navbar from "../islands/Navbar.tsx"
import { defautGuard } from "../utils/guards.ts"
import { KayozenState } from "../utils/interfaces.ts"
import Footer from "../islands/Footer.tsx"
import DashboardClient from "../islands/DashboardClient.tsx"
import { defineTFunction } from "../utils/i18n.ts"

export const handler = defautGuard

export default function Dashboard(
	{ state }: { state: KayozenState },
) {
	const t = defineTFunction(state.lang)
	return (
		<div class="flex flex-col min-h-screen bg-kayozen-light-background dark:bg-kayozen-dark-background">
			<Navbar state={state} />

			<main class="grow p-6 animate-fadeIn relative">
				<h1 class="text-2xl font-bold mb-6">
					{t("dashboard.welcome")}, {state.dbUser?.name}
				</h1>

				<DashboardClient state={state} />
			</main>

			<Footer state={state} />
		</div>
	)
}
