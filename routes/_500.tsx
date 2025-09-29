import { PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { useTranslationContext } from "../islands/TranslationContext.tsx"
import { KayozenState } from "../utils/interfaces.ts"

export default function Error500Page({ error, state }: PageProps) {
	const { t } = useTranslationContext()
	const { dbUser }: Partial<KayozenState> = state

	console.error("Unhandled error:", error)

	return (
		<div class="min-h-screen flex flex-col bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar user={dbUser} />
			<main class="flex flex-col items-center justify-center flex-grow text-center p-6">
				<h1 class="text-3xl font-bold text-red-600 dark:text-red-400">
					{t("error.500.title")}
				</h1>
				<p class="mt-4 text-kayozen-light-muted dark:text-kayozen-dark-muted max-w-lg">
					{t("error.500.description")}
				</p>
			</main>
		</div>
	)
}
