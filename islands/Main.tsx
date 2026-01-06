import { Button } from "../components/Button.tsx"
import { useTranslationContext } from "./TranslationContext.tsx"

export default function Main() {
	const { t } = useTranslationContext()

	return (
		<main class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
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
