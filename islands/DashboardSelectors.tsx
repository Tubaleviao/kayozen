import { FunctionalComponent } from "preact"
import { useTranslationContext } from "./TranslationContext.tsx"
import { DbRole, School } from "../utils/interfaces.ts"

interface Props {
	roles?: DbRole[]
	schools?: School[]
}

const DashboardSelectors: FunctionalComponent<Props> = (
	{ roles = [], schools = [] },
) => {
	const { t } = useTranslationContext()

	function handleRoleChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value
		if (value === "new") {
			e.preventDefault()
			globalThis.location.href = "/choose-role"
		}
	}

	function handleSchoolChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value
		if (value === "new") {
			e.preventDefault()
			globalThis.location.href = "/schools"
		}
	}

	return (
		<div class="flex space-x-4">
			{roles.length > 0 && (
				<div class="relative">
					<select
						onChange={handleRoleChange}
						class="px-3 py-2 rounded bg-kayozen-light-surface dark:bg-kayozen-dark-surface border border-kayozen-light-muted dark:border-kayozen-dark-muted"
					>
						{roles.map((role) => (
							<option value={role.role}>
								{t(`dashboard.role.${role.role}`)}
							</option>
						))}
						<option value="new">
							➕ {t("dashboard.role.add_new")}
						</option>
					</select>
				</div>
			)}

			{schools.length > 0 && (
				<div class="relative">
					<select
						onChange={handleSchoolChange}
						class="px-3 py-2 rounded bg-kayozen-light-surface dark:bg-kayozen-dark-surface border border-kayozen-light-muted dark:border-kayozen-dark-muted"
					>
						{schools.map((school) => (
							<option value={school.id}>
								{school.name}
							</option>
						))}
						<option value="new">
							➕ {t("dashboard.school.add_new")}
						</option>
					</select>
				</div>
			)}
		</div>
	)
}

export default DashboardSelectors
