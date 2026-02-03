// routes/schools/new.tsx
import { PageProps } from "fresh/server.ts"
import CreateSchool from "../../islands/CreateSchool.tsx"
import Navbar from "../../islands/Navbar.tsx"
import { useTranslationContext } from "../../islands/TranslationContext.tsx"
import { defautGuard } from "../../utils/guards.ts"
import { KayozenState } from "../../utils/interfaces.ts"

export const handler = defautGuard

export default function NewSchoolPage(
	{ data: { dbUser } }: PageProps<KayozenState>,
) {
	const { t } = useTranslationContext()

	return (
		<>
			<Navbar user={dbUser} />
			<main class="min-h-screen flex items-center justify-center bg-kayozen-light-background dark:bg-kayozen-dark-background">
				<section class="text-center space-y-6">
					<h1 class="text-3xl font-bold text-kayozen-light-text dark:text-kayozen-dark-text">
						{t("school.create_title")}
					</h1>
					<p class="text-kayozen-light-muted dark:text-kayozen-dark-muted">
						{t("school.create_hint")}
					</p>
					<CreateSchool user={dbUser} />
				</section>
			</main>
		</>
	)
}
