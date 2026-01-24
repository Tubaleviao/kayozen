// routes/dashboard.tsx
import { PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { defautGuard } from "../utils/guards.ts"
import { KayozenState } from "../utils/interfaces.ts"
import { useTranslationContext } from "../islands/TranslationContext.tsx"
import AddProfessor from "../islands/AddProfessor.tsx"

export const handler = defautGuard

export default function Dashboard(
	{ data: { dbUser } }: PageProps<KayozenState>,
) {
	const { t } = useTranslationContext()

	const hasRole = dbUser?.roles?.length || 0 > 0
	const hasSchool = dbUser?.schools?.length || 0 > 0

	return (
		<div class="min-h-screen bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar user={dbUser} />

			<main class="p-6 animate-fadeIn">
				<div class="flex justify-between items-center mb-6">
					<h1 class="text-2xl font-bold">
						{t("dashboard.welcome")}, {dbUser?.name}
					</h1>

					{(hasRole || hasSchool) && (
						<div class="flex space-x-4">
							{hasRole && (
								<div class="relative">
									<select class="px-3 py-2 rounded bg-kayozen-light-surface dark:bg-kayozen-dark-surface border border-kayozen-light-muted dark:border-kayozen-dark-muted">
										{dbUser?.roles?.map((role) => (
											<option selected>
												{t(`dashboard.role.${role.role}`)}
											</option>
										))}
										<option value="new">{t("dashboard.role.add_new")}</option>
									</select>
								</div>
							)}
							{hasSchool && (
								<div class="relative">
									<select class="px-3 py-2 rounded bg-kayozen-light-surface dark:bg-kayozen-dark-surface border border-kayozen-light-muted dark:border-kayozen-dark-muted">
										{dbUser?.schools?.map((school) => (
											<option selected>{school.name}</option>
										))}
										<option value="new">{t("dashboard.school.add_new")}</option>
									</select>
								</div>
							)}
						</div>
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
		</div>
	)
}
