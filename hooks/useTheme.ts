import { useEffect } from "preact/hooks"
import { usePersistency } from "./usePersistency.ts"
import { Theme } from "../utils/interfaces.ts"

export function useTheme(defaultTheme?: Theme) {
	const [theme, setTheme] = usePersistency("theme", defaultTheme)

	useEffect(() => {
		if (!theme) {
			const isDark =
				globalThis.matchMedia("(prefers-color-scheme: dark)").matches
			setTheme(isDark ? "dark" : "light")
		}
	}, [])

	// 🔄 Sync DOM whenever theme changes
	useEffect(() => {
		const html = document.documentElement

		if (theme === "dark") {
			html.classList.add("dark")
		} else {
			html.classList.remove("dark")
		}
	}, [theme])

	// 🔘 Toggle based on state, not DOM
	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"))
	}

	return {
		theme,
		darkMode: theme === "dark",
		toggleTheme,
	}
}
