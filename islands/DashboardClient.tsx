// islands/DashboardClient.tsx
import { useEffect, useState } from "preact/hooks"
import RoleSchoolSelectors from "./RoleSchoolSelectors.tsx"
import DashboardViewByRole from "./RoleDashboardView.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { defineTFunction } from "../utils/i18n.ts"

interface Props {
	state: KayozenState
}

export default function DashboardClient({ state }: Props) {
	const roles = state?.dbUser?.roles ?? []
	const schools = state?.dbUser?.schools ?? []
	const t = defineTFunction(state.lang)

	const [selectedRole, setSelectedRole] = useState(
		roles[0]?.role,
	)

	const [selectedSchoolId, setSelectedSchoolId] = useState(
		schools[0]?.id,
	)

	return (
		<>
			{roles.length === 0 && (
				<div class="flex flex-col items-center justify-center text-center py-16">
					<p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
						You don't have any roles yet. Start by creating one to unlock your
						dashboard features.
					</p>

					<div class="flex gap-4">
						<a
							href="/choose-role"
							class="px-5 py-2 rounded-lg border border-light-muted dark:border-dark-muted hover:bg-light-surface dark:hover:bg-dark-surface text-light-text dark:text-dark-text transition"
						>
							➕ Create Role
						</a>
					</div>
				</div>
			)}
			{schools.length === 0 && (
				<div class="flex flex-col items-center justify-center text-center py-16">
					<p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
						{t("dashboard.no_school")}
					</p>

					<div class="flex gap-4">
						<a
							href="/schools"
							class="px-5 py-2 rounded-lg border border-light-muted dark:border-dark-muted hover:bg-light-surface dark:hover:bg-dark-surface text-light-text dark:text-dark-text transition"
						>
							🏫 Create School
						</a>
					</div>
				</div>
			)}

			{(roles.length > 0 || schools.length > 0) && (
				<div class="flex justify-start mb-6 md:absolute md:top-6 md:right-6 md:mb-0">
					<RoleSchoolSelectors
						roles={roles}
						schools={schools}
						selectedSchoolId={selectedSchoolId}
						onRoleChange={setSelectedRole}
						onSchoolChange={setSelectedSchoolId}
						lang={state.lang}
					/>
				</div>
			)}

			{(roles.length > 0 && schools.length > 0) && (
				<DashboardViewByRole
					role={selectedRole}
					school={schools.find((s) => s.id === selectedSchoolId)}
					lang={state.lang}
				/>
			)}
		</>
	)
}
