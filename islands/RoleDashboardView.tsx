import { School } from "../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"
import CoordinatorView from "./coordinator/CoordinatorView.tsx"

interface Props {
	role?: string
	school?: School
	lang: SupportedLang
}

export default function DashboardViewByRole(
	{ role, school, lang }: Props,
) {
	if (!role) return null
	const t = defineTFunction(lang)

	if (role === "coordinator") {
		return (
			<CoordinatorView
				school={school}
				lang={lang}
			/>
		)
	}

	if (role === "teacher") {
		return (
			<section class="flex flex-col items-center gap-8 mt-12">
				{/* Professor (usuário) */}
				<div class="w-36 h-36 rounded-full flex items-center justify-center 
           bg-light-surface dark:bg-dark-surface 
           shadow-md text-4xl">
					👩‍🏫
				</div>

				<p class="font-medium text-lg">
					{school?.name}
				</p>

				{/* CTA */}
				<a
					href="/schools"
					class="px-6 py-2 rounded-full 
           bg-light-primary text-white font-semibold hover:opacity-90 transition"
				>
					{t("dashboard.school.edit")}
				</a>

				{/* Placeholder */}
				<p class="text-sm text-light-muted dark:text-dark-muted">
					...
				</p>
			</section>
		)
	}

	return null
}
