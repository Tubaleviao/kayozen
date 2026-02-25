import { defineTFunction, SupportedLang } from "../utils/i18n.ts"

export default function Error404Island({ lang }: { lang: SupportedLang }) {
	const t = defineTFunction(lang)

	return (
		<div class="w-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4">
			<div class="max-w-(--breakpoint-md) text-center animate-fadeIn">
				<img
					class="mx-auto mb-6"
					src="/logo.svg"
					width="128"
					height="128"
					alt="Kayozen logo"
				/>
				<h1 class="text-4xl font-bold text-light-primary dark:text-dark-primary">
					{t("error.404.title")}
				</h1>
				<p class="mt-2 text-lg text-light-muted dark:text-dark-muted">
					{t("error.404.message")}
				</p>
				<a
					href="/"
					class="mt-6 inline-block px-6 py-3 rounded-2xl shadow-md bg-light-primary text-white font-medium hover:opacity-90 transition"
				>
					{t("error.404.back")}
				</a>
			</div>
		</div>
	)
}
