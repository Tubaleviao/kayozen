import { PageProps } from "$fresh/server.ts"
import { TranslationProvider } from "../islands/TranslationContext.tsx"
import { SupportedLang } from "../utils/i18n.ts"

export interface KayozenState {
	theme: "light" | "dark"
	lang: SupportedLang
}

export default function App({ Component, state }: PageProps) {
	const { theme, lang = "pt" }: Partial<KayozenState> = state
	return (
		<html class={theme === "dark" ? "dark" : ""}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
				<link rel="stylesheet" href="/styles.css" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
				/>
			</head>
			<body class="bg-kayozen-light-background dark:bg-kayozen-dark-background">
				<TranslationProvider defaultLang={lang}>
					<Component />
				</TranslationProvider>
			</body>
		</html>
	)
}
