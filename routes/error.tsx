import { HttpError } from "fresh"
import Navbar from "../islands/Navbar.tsx"
import Error404Island from "../islands/Error404.tsx"
import { Head } from "fresh/runtime"
import { KayozenState } from "@/utils/interfaces.ts"
import { defineTFunction } from "@/utils/i18n/index.ts"

export default function ErrorPage(
	{ state, error }: { state: KayozenState; error: HttpError },
) {
	const t = defineTFunction(state.lang)
	if (error instanceof HttpError) {
		const status = error.status // HTTP status code

		// Render a 404 not found page
		if (status === 404) {
			return (
				<>
					<Navbar state={state} />
					<Head>
						<title>{t("error.404.title")}</title>
					</Head>
					<Error404Island lang={state.lang} />
				</>
			)
		} else if (status === 500) {
			return (
				<div class="min-h-screen flex flex-col bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
					<Navbar state={state} />
					<main class="flex flex-col items-center justify-center grow text-center p-6">
						<h1 class="text-3xl font-bold text-red-600 dark:text-red-400">
							{t("error.500.title")}
						</h1>
						<p class="mt-4 text-light-muted dark:text-dark-muted max-w-lg">
							{t("error.500.description")}
						</p>
					</main>
				</div>
			)
		}
	}

	return <h1>Oh no...</h1>
}
