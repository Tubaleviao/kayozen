import CreateSchool from "../../islands/CreateSchool.tsx"
import Navbar from "../../islands/Navbar.tsx"
import { defautGuard } from "@/utils/guards.ts"
import { KayozenState } from "@/utils/interfaces.ts"
import { defineTFunction } from "@/utils/i18n/index.ts"

export const handler = defautGuard

export default function NewSchoolPage(
	{ state }: { state: KayozenState },
) {
	const t = defineTFunction(state.lang)

	return (
		<>
			<Navbar state={state} />
			<main class="min-h-screen flex items-center justify-center bg-light-background dark:bg-dark-background">
				<section class="text-center space-y-6">
					<h1 class="text-3xl font-bold text-light-text dark:text-dark-text">
						{t("school.create_title")}
					</h1>
					<p class="text-light-muted dark:text-dark-muted">
						{t("school.create_hint")}
					</p>
					<CreateSchool state={state} />
				</section>
			</main>
		</>
	)
}
