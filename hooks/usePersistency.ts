import { useEffect, useState } from "preact/hooks"
import { getCookie, setCookie } from "@/utils/cookies.ts"

export function usePersistency(
	key: string,
	defaultValue: string = "",
) {
	const cookieKey = `kayo${key}`

	const [value, setValue] = useState<string>(() => {
		try {
			return getCookie(cookieKey) ?? defaultValue
		} catch {
			return defaultValue
		}
	})

	useEffect(() => {
		try {
			setCookie(cookieKey, value)
		} catch (e) {
			console.warn(`Error writing cookie ${cookieKey}:`, e)
		}
	}, [cookieKey, value])

	return [value, setValue] as const
}
