// islands/DashboardClient.tsx
import { useState } from "preact/hooks"
import DashboardSelectors from "./DashboardSelectors.tsx"
import RoleDashboardView from "./RoleDashboardView.tsx"
import { DbUser } from "../utils/interfaces.ts"

interface Props {
	user?: DbUser
}

export default function DashboardClient({ user }: Props) {
	const roles = user?.roles ?? []
	const schools = user?.schools ?? []

	const [selectedRole, setSelectedRole] = useState(
		roles[0]?.role,
	)

	const [selectedSchoolId, setSelectedSchoolId] = useState(
		schools[0]?.id,
	)

	return (
		<>
			{(roles.length > 0 || schools.length > 0) && (
				<div class="flex justify-start mb-6 md:absolute md:top-6 md:right-6 md:mb-0">
					<DashboardSelectors
						roles={roles}
						schools={schools}
						selectedSchoolId={selectedSchoolId}
						onRoleChange={setSelectedRole}
						onSchoolChange={setSelectedSchoolId}
					/>
				</div>
			)}

			<RoleDashboardView
				role={selectedRole}
				school={schools.find((s) => s.id === selectedSchoolId)}
				user={user}
			/>
		</>
	)
}
