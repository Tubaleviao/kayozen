import { useEffect, useState } from "preact/hooks"
import { usePersistency } from "./usePersistency.ts"

export function useTheme() {
	const [darkMode, setDarkMode] = useState(false)
	const [theme, setTheme] = usePersistency<"light" | "dark">("theme", "light")

	useEffect(() => {
		const isDark = theme === "dark"
		setDarkMode(isDark)
	}, [])

	const toggleTheme = () => {
		const html = document.documentElement
		const isDark = html.classList.contains("dark")

		if (isDark) {
			html.classList.remove("dark")
			setTheme("light")
			setDarkMode(false)
		} else {
			html.classList.add("dark")
			setTheme("dark")
			setDarkMode(true)
		}
	}

	return { darkMode, toggleTheme }
}
