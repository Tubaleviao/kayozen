import { define } from "../utils.ts";
import ToastProvider from "../islands/ToastProvider.tsx"
import { TranslationProvider } from "../islands/TranslationContext.tsx"

export default define.page(function App({ Component, state }){
	return (
		<html class={state.theme === "dark" ? "dark" : ""}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
			</head>
			<body class="bg-kayozen-light-background dark:bg-kayozen-dark-background">
				<TranslationProvider defaultLang={state.lang}>
					<ToastProvider>
						<Component />
					</ToastProvider>
				</TranslationProvider>
			</body>
		</html>
	)
})
