import Navbar from "../islands/Navbar.tsx"
import ChooseRoleBox from "../islands/ChooseRoleBox.tsx"
import { defautGuard } from "../utils/guards.ts"
import { KayozenState } from "../utils/interfaces.ts"

export const handler = defautGuard

export default function ChooseRolePage(
	{ state }: { state: KayozenState },
) {
	return (
		<div class="min-h-screen bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar state={state} />
			<ChooseRoleBox state={state} />
		</div>
	)
}
