import { useEffect } from "preact/hooks"
import { usePersistency } from "./usePersistency.ts"
import { Theme } from "../utils/interfaces.ts"

export function useTheme(defaultTheme?: Theme) {
	const [theme, setTheme] = usePersistency("theme", defaultTheme)

	useEffect(() => {
		const html = document.documentElement
		const systemDark =
			globalThis.matchMedia("(prefers-color-scheme: dark)").matches
		if (!theme) {
			html.classList.toggle("dark", systemDark)
			return
		}
		html.classList.toggle("dark", theme === "dark")
	}, [theme])

	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"))
	}

	return {
		theme,
		darkMode: theme === "dark",
		toggleTheme,
	}
}
