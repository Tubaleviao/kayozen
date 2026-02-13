import { define } from "../utils.ts"

export default define.page(function App({ Component, state }) {
	return (
		<html class={state.theme === "dark" ? "dark" : ""}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
			</head>
			<body class="bg-kayozen-light-background dark:bg-kayozen-dark-background">
				<Component />
			</body>
		</html>
	)
})
