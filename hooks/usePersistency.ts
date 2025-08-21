import { useEffect, useState } from "preact/hooks"
import { getCookie, setCookie } from "../components/cookies.ts"
import { KayozenState } from "../routes/_app.tsx"

export function usePersistency<T>(key: keyof KayozenState, defaultValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window !== "undefined") {
			try {
				const stored = getCookie("kayo" + key)
				if (stored !== null) return stored as T
			} catch (e) {
				console.warn(`Error reading cookie key kayo${key}":`, e)
			}
		}
		return defaultValue
	})

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				setCookie("kayo"+key, value as string)
			} catch (e) {
				console.warn(`Error writing cookie key kayo"${key}":`, e)
			}
		}
	}, [key, value])

	return [value, setValue] as const
}
