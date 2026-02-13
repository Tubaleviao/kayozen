// islands/RoleDashboardView.tsx
import AddProfessor from "./AddProfessor.tsx"
import { DbUser, School } from "../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"

interface Props {
	role?: string
	school?: School
	user?: DbUser | null
	lang: SupportedLang
}

export default function RoleDashboardView({ role, school, user, lang }: Props) {

	if (!role) return null
	const t = defineTFunction(lang)

	if (role === "coordinator") {
		if (!school) {
			return (
				<div class="text-center mt-10 text-kayozen-light-muted dark:text-kayozen-dark-muted">
					{t("dashboard.no_school")}
				</div>
			)
		}
		return (
			<section class="flex flex-col items-center gap-8 mt-12">
				<AddProfessor school={school} />
			</section>
		)
	}

	if (role === "teacher") {
		return (
			<section class="flex flex-col items-center gap-8 mt-12">
				{/* Professor (usuário) */}
				<div class="w-36 h-36 rounded-full flex items-center justify-center 
           bg-kayozen-light-surface dark:bg-kayozen-dark-surface 
           shadow-md text-4xl">
					👩‍🏫
				</div>

				<p class="font-medium text-lg">
					{user?.name}
				</p>

				{/* CTA */}
				<a
					href="/schools"
					class="px-6 py-2 rounded-full 
           bg-kayozen-light-primary dark:bg-kayozen-dark-primary 
           text-white font-semibold hover:opacity-90 transition"
				>
					{t("dashboard.school.edit")}
				</a>

				{/* Placeholder */}
				<p class="text-sm text-kayozen-light-muted dark:text-kayozen-dark-muted">
					...
				</p>
			</section>
		)
	}

	return null
}
