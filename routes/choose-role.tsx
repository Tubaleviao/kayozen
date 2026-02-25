import Navbar from "../islands/Navbar.tsx"
import ChooseRoleBox from "../islands/ChooseRoleBox.tsx"
import { defautGuard } from "../utils/guards.ts"
import { KayozenState } from "../utils/interfaces.ts"

export const handler = defautGuard

export default function ChooseRolePage(
	{ state }: { state: KayozenState },
) {
	return (
		<div class="min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
			<Navbar state={state} />
			<ChooseRoleBox state={state} />
		</div>
	)
}
