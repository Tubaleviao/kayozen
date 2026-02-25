import ToastHost from "../islands/ToastHost.tsx"
import { define } from "../utils.ts"

export default define.page(function App({ Component, state }) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
			</head>
			<body class="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
				<ToastHost />
				<Component />
			</body>
		</html>
	)
})
