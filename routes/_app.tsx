import ToastHost from "../islands/ToastHost.tsx"
import { define } from "../utils.ts"

export default define.page(function App({ Component, state }) {
	const theme = state.theme

	return (
		<html class={theme === "dark" ? "dark" : undefined}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function () {
								const match = document.cookie.match(/kayotheme=(light|dark)/);
								const theme = match ? match[1] : "";
								const media = window.matchMedia("(prefers-color-scheme: dark)");

								function apply(t) {
									if (t === "dark") {
										document.documentElement.classList.add("dark");
									} else if (t === "light") {
										document.documentElement.classList.remove("dark");
									} else {
										document.documentElement.classList.toggle("dark", media.matches);
									}
								}

								apply(theme);

								if (theme === "") {
									media.addEventListener("change", function () {
										document.documentElement.classList.toggle("dark", media.matches);
									});
								}
							})();
							`,
					}}
				/>
			</head>
			<body class="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
				<ToastHost initialFlash={state.error} />
				<Component />
			</body>
		</html>
	)
})
