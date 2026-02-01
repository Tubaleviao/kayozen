import { PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { defautGuard } from "../utils/guards.ts"
import { KayozenState } from "../utils/interfaces.ts"
import { useTranslationContext } from "../islands/TranslationContext.tsx"
import Footer from "../islands/Footer.tsx"
import DashboardClient from "../islands/DashboardClient.tsx"

export const handler = defautGuard

export default function Dashboard(
	{ data: { dbUser } }: PageProps<KayozenState>,
) {
	const { t } = useTranslationContext()

	return (
		<div class="flex flex-col min-h-screen bg-kayozen-light-background dark:bg-kayozen-dark-background">
			<Navbar user={dbUser} />

			<main class="flex-grow p-6 animate-fadeIn">
				<h1 class="text-2xl font-bold mb-6">
					{t("dashboard.welcome")}, {dbUser?.name}
				</h1>

				<DashboardClient user={dbUser} />
			</main>

			<Footer />
		</div>
	)
}
