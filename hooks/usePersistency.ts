import { useEffect, useState } from "preact/hooks"

export function usePersistency<T>(key: string, defaultValue: T) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window !== "undefined") {
			try {
				const stored = localStorage.getItem(key)
				if (stored !== null) return JSON.parse(stored) as T
			} catch (e) {
				console.warn(`Error reading localStorage key "${key}":`, e)
			}
		}
		return defaultValue
	})

	useEffect(() => {
		if (typeof window !== "undefined") {
			try {
				localStorage.setItem(key, JSON.stringify(value))
			} catch (e) {
				console.warn(`Error writing localStorage key "${key}":`, e)
			}
		}
	}, [key, value])

	return [value, setValue] as const
}
