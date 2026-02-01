import { FunctionalComponent } from "preact"
import { useTranslationContext } from "./TranslationContext.tsx"
import { DbRole, School } from "../utils/interfaces.ts"
import { Role } from "../utils/constants.ts"

interface Props {
	roles?: DbRole[]
	schools?: School[]
	selectedSchoolId: string
	onRoleChange: (role: Role) => void
	onSchoolChange: (id: string) => void
}

const DashboardSelectors: FunctionalComponent<Props> = (
	{ roles = [], schools = [], selectedSchoolId, onRoleChange, onSchoolChange },
) => {
	const { t } = useTranslationContext()

	function handleRoleChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value
		if (value === "new") {
			e.preventDefault()
			globalThis.location.href = "/choose-role"
		} else onRoleChange(value as Role)
	}

	function handleSchoolChange(e: Event) {
		const value = (e.target as HTMLSelectElement).value

		if (value === "new") {
			e.preventDefault()
			globalThis.location.href = "/schools"
			return
		} else onSchoolChange(value)
	}

	function handleEditSchool() {
		if (!selectedSchoolId) return
		globalThis.location.href = `/schools/${selectedSchoolId}`
	}

	return (
		<div class="flex space-x-4 items-center">
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
				<div class="flex items-center space-x-2">
					<select
						value={selectedSchoolId}
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

					{/* Edit button */}
					{selectedSchoolId && (
						<button
							type="button"
							onClick={handleEditSchool}
							title={t("dashboard.school.edit")}
							class="p-2 rounded hover:bg-kayozen-light-muted dark:hover:bg-kayozen-dark-muted transition"
						>
							✏️
						</button>
					)}
				</div>
			)}
		</div>
	)
}

export default DashboardSelectors
