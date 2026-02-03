import { define } from "../utils.ts";
import ToastProvider from "../islands/ToastProvider.tsx"
import { TranslationProvider } from "../islands/TranslationContext.tsx"
import { KayozenState } from "../utils/interfaces.ts"

export default define.page(function App({ Component }) {
	return (
		<html class={theme === "dark" ? "dark" : ""}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
			</head>
			<body class="bg-kayozen-light-background dark:bg-kayozen-dark-background">
				<TranslationProvider defaultLang={lang}>
					<ToastProvider>
						<Component />
					</ToastProvider>
				</TranslationProvider>
			</body>
		</html>
	)
})
