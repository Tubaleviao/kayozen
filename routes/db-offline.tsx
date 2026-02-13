import Navbar from "../islands/Navbar.tsx"

import { KayozenState } from "../utils/interfaces.ts"
import { defineTFunction } from "../utils/i18n.ts"

export default function DbOfflinePage({ state }: {state: KayozenState }) {
	const t = defineTFunction(state.lang)

	return (
		<div class="min-h-screen flex flex-col bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar state={state} />
			<main class="flex flex-col items-center justify-center grow text-center p-6">
				<h1 class="text-3xl font-bold text-red-600 dark:text-red-400">
					{t("db_offline.title")}
				</h1>
				<p class="mt-4 text-kayozen-light-muted dark:text-kayozen-dark-muted max-w-lg">
					{t("db_offline.description")}
				</p>
			</main>
		</div>
	)
}
