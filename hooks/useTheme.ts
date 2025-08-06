import { useEffect, useState } from "preact/hooks"

export function useTheme() {
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const saved = localStorage.getItem("theme")
		const isDark = saved === "dark"

		document.documentElement.classList.toggle("dark", isDark)
		setDarkMode(isDark)
	}, [])

	const toggleTheme = () => {
		const html = document.documentElement
		const isDark = html.classList.contains("dark")

		if (isDark) {
			html.classList.remove("dark")
			localStorage.setItem("theme", "light")
			setDarkMode(false)
		} else {
			html.classList.add("dark")
			localStorage.setItem("theme", "dark")
			setDarkMode(true)
		}
	}

	return { darkMode, toggleTheme }
}
