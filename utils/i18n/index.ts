import { about } from "./about.ts"
import { billing } from "./billing.ts"
import { login } from "./login.ts"
import { indexPage } from "./indexPage.ts"
import { footer } from "./footer.ts"
import { error } from "./error.ts"
import { nav } from "./nav.ts"
import { signup } from "./signup.ts"
import { school } from "./school.ts"
import { roles } from "./roles.ts"
import { dashboard } from "./dashboard.ts"
import { db_offline } from "./db_offline.ts"
import { common } from "./common.ts"
import { SupportedLang, tFunction } from "../interfaces.ts"

export const translations = {
	pt: {
		about: about.pt,
		billing: billing.pt,
		login: login.pt,
		index: indexPage.pt,
		footer: footer.pt,
		error: error.pt,
		nav: nav.pt,
		signup: signup.pt,
		school: school.pt,
		roles: roles.pt,
		dashboard: dashboard.pt,
		db_offline: db_offline.pt,
		common: common.pt,
	},
	en: {
		about: about.en,
		billing: billing.en,
		login: login.en,
		index: indexPage.en,
		footer: footer.en,
		error: error.en,
		nav: nav.en,
		signup: signup.en,
		school: school.en,
		roles: roles.en,
		dashboard: dashboard.en,
		db_offline: db_offline.en,
		common: common.en,
	},
} as const


// 🔑 Tipagem dinâmica baseada no objeto acima
export type TranslationKey = NestedKeyOf<typeof translations["pt"]>

// Função utilitária para acessar objetos aninhados com "dot notation"
function getNested(obj: any, key: string): string | undefined {
	return key.split(".").reduce((acc, part) => acc?.[part], obj)
}

// Função de tradução com fallback e interpolação
export function defineTFunction(
	lang: SupportedLang = "pt",
): tFunction {
	return (key, vars) => {
		let text = getNested(translations[lang], key) ??
			getNested(translations["en"], key) ?? key

		if (vars) {
			Object.entries(vars).forEach(([k, v]) => {
				text = text.replace(new RegExp(`{${k}}`, "g"), String(v))
			})
		}
		return text
	}
}

// 🔧 Tipagem para chaves aninhadas ("login.email" etc.)
type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
		? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
		: `${Key}`
}[keyof ObjectType & (string | number)]
