export type SupportedLang = "pt" | "en"

export type TranslationKey =
	| "login.title"
	| "login.email"
	| "login.password"
	| "login.button"
	| "login.or"
	| "login.google"
	| "login.no_account"
	| "login.signup"
	| "index.welcome"
	| "index.description"
	| "index.start"
	| "footer.rights"
	| "footer.about"
	| "footer.contact"
	| "footer.privacy"

const translations: Record<SupportedLang, Record<TranslationKey, string>> = {
	pt: {
		"login.title": "Entrar no Haikaku",
		"login.email": "E-mail",
		"login.password": "Senha",
		"login.button": "Entrar",
		"login.or": "ou",
		"login.google": "Entrar com Google",
		"login.no_account": "Não tem uma conta?",
		"login.signup": "Cadastre-se",
		"index.welcome": "Bem-vindo ao",
		"index.description": "Cadastre-se",
		"index.start": "Cadastre-se",
		"footer.rights": "Todos os direitos reservados.",
		"footer.about": "Sobre",
		"footer.contact": "Contato",
		"footer.privacy": "Privacidade",
	},
	en: {
		"login.title": "Sign in to Haikaku",
		"login.email": "Email",
		"login.password": "Password",
		"login.button": "Sign in",
		"login.or": "or",
		"login.google": "Sign in with Google",
		"login.no_account": "Don't have an account?",
		"login.signup": "Sign up",
		"index.welcome": "Bem-vindo ao",
		"index.description": "Cadastre-se",
		"index.start": "Cadastre-se",
		"footer.rights": "Cadastre-se",
		"footer.about": "Cadastre-se",
		"footer.contact": "Cadastre-se",
		"footer.privacy": "Cadastre-se",
	},
}

export function t(key: TranslationKey, lang: SupportedLang = "pt"): string {
	return translations[lang][key]
}
