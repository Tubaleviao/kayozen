import { useCallback } from "preact/hooks"
import { SupportedLang, t as translate, TranslationKey } from "../utils/i18n.ts"
import { usePersistency } from "./usePersistency.ts"

export function useTranslation(defaultLang: SupportedLang = "pt") {
	const [lang, setLang] = usePersistency<SupportedLang>("lang", defaultLang)

	const t = useCallback(
		(key: TranslationKey) => translate(key, lang),
		[lang],
	)

	return { lang, setLang, t }
}
