import { useEffect, useState } from "preact/hooks"
import { getCookie, setCookie } from "../utils/cookies.ts"
import { KayozenState } from "../utils/interfaces.ts"

export function usePersistency<T>(
  key: keyof KayozenState,
  defaultValue: T,
) {
  // 1️⃣ Always initialize with a pure value
  const [value, setValue] = useState<T>(defaultValue)

  // 2️⃣ Read from cookie on client only
  useEffect(() => {
    try {
      const stored = getCookie("kayo" + key)
      if (stored !== null) {
        setValue(stored as T)
      }
    } catch (e) {
      console.warn(`Error reading cookie key kayo${key}:`, e)
    }
  }, [key])

  // 3️⃣ Persist on change
  useEffect(() => {
    try {
      setCookie("kayo" + key, value as string)
    } catch (e) {
      console.warn(`Error writing cookie key kayo${key}:`, e)
    }
  }, [key, value])

  return [value, setValue] as const
}
