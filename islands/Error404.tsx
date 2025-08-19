import { useTranslationContext } from "./TranslationContext.tsx"

export default function Error404Island() {
	const { t } = useTranslationContext()

	return (
		<div class="w-screen flex items-center justify-center bg-kayozen-light-background dark:bg-kayozen-dark-background px-4">
			<div class="max-w-screen-md text-center animate-fadeIn">
				<img
					class="mx-auto mb-6"
					src="/logo.svg"
					width="128"
					height="128"
					alt="Kayozen logo"
				/>
				<h1 class="text-4xl font-bold text-kayozen-light-primary dark:text-kayozen-dark-primary">
					{t("error.404.title")}
				</h1>
				<p class="mt-2 text-lg text-kayozen-light-muted dark:text-kayozen-dark-muted">
					{t("error.404.message")}
				</p>
				<a
					href="/"
					class="mt-6 inline-block px-6 py-3 rounded-2xl shadow-md bg-kayozen-light-primary text-white font-medium hover:opacity-90 transition"
				>
					{t("error.404.back")}
				</a>
			</div>
		</div>
	)
}
