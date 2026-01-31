// routes/schools/[id].tsx
import { PageProps } from "$fresh/server.ts"
import Navbar from "../../islands/Navbar.tsx"
import SchoolDetailsEditor from "../../islands/SchoolDetailsEditor.tsx"
import { useTranslationContext } from "../../islands/TranslationContext.tsx"
import { KayozenState, School } from "../../utils/interfaces.ts"

interface Data {
	school: School
}

export default function SchoolPage({ state, data }: PageProps<Data>) {
	const { dbUser }: Partial<KayozenState> = state
	const { t } = useTranslationContext()
	const { school } = data

	return (
		<>
			<Navbar user={dbUser} />

			<main class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
				<div class="text-center space-y-2 mb-10">
					<h1 class="text-2xl font-bold">
						{t("school.detail_title")}
					</h1>
					<p class="text-kayozen-light-muted dark:text-kayozen-dark-muted">
						ID: {school?.id}
					</p>
				</div>

				{school && <SchoolDetailsEditor school={school} />}
			</main>
		</>
	)
}
