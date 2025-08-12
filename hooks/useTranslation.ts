// /hooks/useTranslation.ts
import { useCallback, useEffect } from "preact/hooks"
import { SupportedLang, t as translate, TranslationKey } from "../utils/i18n.ts"
import { usePersistency } from "./usePersistency.ts"

export function useTranslation() {
	const [lang, setLang] = usePersistency<SupportedLang>("app_lang", "pt")

	useEffect(() => {
		setLang(lang || "pt")
	}, [])

	useEffect(() => {
		localStorage.setItem("lang", lang)
	}, [lang])

	const t = useCallback(
		(key: TranslationKey) => translate(key, lang),
		[lang],
	)

	return { lang, setLang, t }
}
