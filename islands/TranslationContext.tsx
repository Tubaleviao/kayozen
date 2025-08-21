import { createContext } from "preact"
import { useContext } from "preact/hooks"
import { SupportedLang, TranslationKey } from "../utils/i18n.ts"
import { useTranslation } from "../hooks/useTranslation.ts"

type TranslationContextType = {
	lang: SupportedLang
	setLang: (lang: SupportedLang) => void
	t: (key: TranslationKey) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(
	undefined,
)

export function TranslationProvider(
	{ children, defaultLang = "pt" }: {
		children: preact.ComponentChildren
		defaultLang?: SupportedLang
	},
) {
	const { lang, setLang, t } = useTranslation(defaultLang)

	return (
		<TranslationContext.Provider value={{ lang, setLang, t }}>
			{children}
		</TranslationContext.Provider>
	)
}

export function useTranslationContext() {
	const ctx = useContext(TranslationContext)
	if (!ctx) {
		throw new Error(
			"useTranslationContext must be used inside TranslationProvider",
		)
	}
	return ctx
}
