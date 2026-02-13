import { Button } from "../components/Button.tsx"
import { KayozenState } from "../utils/interfaces.ts"
import { defineTFunction } from "../utils/i18n.ts"

interface MainProps {
	state: KayozenState
}

export default function Main({state}: MainProps) {
	const t = defineTFunction(state.lang)
	
	return (
		<main class="grow max-w-(--breakpoint-lg) mx-auto px-4 py-10 animate-fadeIn">
			<h1 class="text-4xl font-bold mb-4">
				{`${t("index.welcome")} `}
				<span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
					Kayozen
				</span>
			</h1>
			<p class="text-lg text-kayozen-light-muted dark:text-kayozen-dark-muted mb-6">
				{`${t("index.description")}`}
			</p>

			<Button to="/login">
				{`${t("index.start")}`}
			</Button>
		</main>
	)
}
