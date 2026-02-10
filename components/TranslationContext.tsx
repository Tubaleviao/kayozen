// components/TranslationContext.tsx
import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { useTranslation } from "../hooks/useTranslation.ts"
import type { SupportedLang } from "../utils/i18n.ts"

const TranslationContext = createContext<{
	t: (key: any) => string
	lang: SupportedLang
	setLang: (l: SupportedLang) => void
} | null>(null)

export function TranslationProvider(
	{ children }: { children: preact.ComponentChildren },
) {
	const { t, lang, setLang } = useTranslation()

	return (
		<TranslationContext.Provider value={{ t, lang, setLang }}>
			{children}
		</TranslationContext.Provider>
	)
}

export function useTranslationContext() {
	const ctx = useContext(TranslationContext)
	if (!ctx) {
		throw new Error("useTranslationContext must be used inside TranslationProvider")
	}
	return ctx
}
