import { useState } from "preact/hooks"
import { useTranslationContext } from "./TranslationContext.tsx"
import { TranslationKey } from "../utils/i18n.ts"

interface Role {
	key: TranslationKey
	desc: TranslationKey
	value: string
	icon: string
	disabled?: boolean
}

export default function ChooseRoleBox() {
	const { t } = useTranslationContext()
	const [selectedRole, setSelectedRole] = useState<string | null>(null)

	const roles: Role[] = [
		{
			key: "roles.student",
			desc: "roles.student_desc",
			value: "student",
			icon: "🎓",
			disabled: true,
		},
		{
			key: "roles.teacher",
			desc: "roles.teacher_desc",
			value: "teacher",
			icon: "📖",
			disabled: true,
		},
		{
			key: "roles.coordinator",
			desc: "roles.coordinator_desc",
			value: "coordinator",
			icon: "🏫",
		},
	]

	return (
		<main class="max-w-3xl mx-auto p-6 animate-fadeIn">
			<h1 class="text-3xl font-bold text-center mb-2">{t("roles.title")}</h1>
			<p class="text-center text-kayozen-light-muted dark:text-kayozen-dark-muted mb-8">
				{t("roles.choose")}
			</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				{roles.map((role) => {
					const isSelected = selectedRole === role.value
					const isDisabled = role.disabled

					return (
						<div
							key={role.value}
							class={`p-6 rounded-2xl shadow-md border-2 transition select-none ${
								isDisabled
									? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800"
									: "cursor-pointer bg-kayozen-light-surface dark:bg-kayozen-dark-surface hover:border-kayozen-light-muted dark:hover:border-kayozen-dark-muted"
							} ${
								isSelected && !isDisabled
									? "border-kayozen-light-primary dark:border-kayozen-dark-primary"
									: "border-transparent"
							}`}
							onClick={() => {
								if (!isDisabled) setSelectedRole(role.value)
							}}
						>
							<div
								class={`text-4xl mb-4 text-center ${
									isDisabled
										? "text-gray-400"
										: "text-kayozen-light-text dark:text-kayozen-dark-text"
								}`}
							>
								{role.icon}
							</div>
							<h2
								class={`text-xl font-semibold text-center mb-2 ${
									isDisabled
										? "text-gray-500"
										: "text-kayozen-light-text dark:text-kayozen-dark-text"
								}`}
							>
								{t(role.key)}
							</h2>
							<p
								class={`text-sm text-center ${
									isDisabled
										? "text-gray-400"
										: "text-kayozen-light-muted dark:text-kayozen-dark-muted"
								}`}
							>
								{t(role.desc)}
							</p>
						</div>
					)
				})}
			</div>

			<div class="mt-8 text-center">
				<form method="POST" action="/api/choose-role">
					<input type="hidden" name="role" value={selectedRole ?? ""} />
					<button
						type="submit"
						disabled={!selectedRole}
						class={`px-6 py-3 rounded-lg font-medium transition ${
							selectedRole
								? "bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white hover:opacity-90"
								: "bg-gray-400 text-gray-200 cursor-not-allowed"
						}`}
					>
						{t("roles.confirm")}
					</button>
				</form>
			</div>
		</main>
	)
}
