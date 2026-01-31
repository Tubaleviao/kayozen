import { PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { defautGuard } from "../utils/guards.ts"
import { KayozenState } from "../utils/interfaces.ts"
import { useTranslationContext } from "../islands/TranslationContext.tsx"
import AddProfessor from "../islands/AddProfessor.tsx"
import DashboardSelectors from "../islands/DashboardSelectors.tsx"
import Footer from "../islands/Footer.tsx"

export const handler = defautGuard

export default function Dashboard(
	{ data: { dbUser } }: PageProps<KayozenState>,
) {
	const { t } = useTranslationContext()

	const hasRole = dbUser?.roles?.length || 0 > 0
	const hasSchool = dbUser?.schools?.length || 0 > 0

	return (
		<div class="flex flex-col min-h-screen bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar user={dbUser} />

			<main class="flex-grow p-6 animate-fadeIn">
				<div class="flex justify-between items-center mb-6">
					<h1 class="text-2xl font-bold">
						{t("dashboard.welcome")}, {dbUser?.name}
					</h1>

					{(hasRole || hasSchool) && (
						<DashboardSelectors
							roles={dbUser?.roles}
							schools={dbUser?.schools}
						/>
					)}
				</div>

				{!hasRole && (
					<div class="bg-kayozen-light-surface dark:bg-kayozen-dark-surface p-6 rounded-lg shadow-md text-center mb-6">
						<p class="mb-4">{t("dashboard.no_role")}</p>
						<a
							href="/choose-role"
							class="inline-block bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
						>
							{t("dashboard.choose_role_button")}
						</a>
					</div>
				)}

				{!hasSchool && (
					<div class="bg-kayozen-light-surface dark:bg-kayozen-dark-surface p-6 rounded-lg shadow-md text-center">
						<p class="mb-4">{t("dashboard.no_school")}</p>
						<a
							href="/schools"
							class="inline-block bg-kayozen-light-secondary dark:bg-kayozen-dark-secondary text-white px-4 py-2 rounded hover:opacity-90 transition"
						>
							{t("dashboard.create_school_button")}
						</a>
					</div>
				)}

				{hasSchool && hasRole && (
					<AddProfessor
						school={dbUser?.schools ? dbUser?.schools[0] : undefined}
					/>
				)}
			</main>

			<Footer />
		</div>
	)
}
