export type SupportedLang = "pt" | "en"

export type TranslationKey =
	| "login.signin"
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
	| "error.404.title"
	| "error.404.message"
	| "error.404.back"
	| "nav.we"
	| "nav.login"
	| "nav.light"
	| "nav.dark"
	| "nav.theme"
	| "login.remember"
	| "signup.title"
	| "signup.name"
	| "signup.email"
	| "signup.password"
	| "signup.confirmPassword"
	| "signup.accept_terms"
	| "signup.button"
	| "signup.loading"
	| "signup.or"
	| "signup.google"
	| "signup.already_account"
	| "signup.signin"

const translations: Record<SupportedLang, Record<TranslationKey, string>> = {
	pt: {
		"login.signin": "Entrar no",
		"login.email": "E-mail",
		"login.password": "Senha",
		"login.button": "Entrar",
		"login.or": "ou",
		"login.google": "Entrar com Google",
		"login.no_account": "Não tem uma conta?",
		"login.signup": "Cadastre-se",
		"login.remember": "Manter conectado",
		"index.welcome": "Bem-vindo ao",
		"index.description":
			"Seu sistema inteligente para gestão de disponibilidade de professores.",
		"index.start": "Começar",
		"footer.rights": "Todos os direitos reservados.",
		"footer.about": "Sobre",
		"footer.contact": "Contato",
		"footer.privacy": "Privacidade",
		"error.404.title": "404 - Página não encontrada",
		"error.404.message": "A página que você procura não existe.",
		"error.404.back": "Voltar para a página inicial",
		"nav.we": "Quem Somos",
		"nav.light": "Mudar para o Modo Claro",
		"nav.dark": "Mudar para o Modo Escuro",
		"nav.theme": "Alternar tema",
		"nav.login": "Login",
		"signup.title": "Crie sua conta",
		"signup.name": "Nome",
		"signup.email": "Email",
		"signup.password": "Senha",
		"signup.confirmPassword": "Confirmar senha",
		"signup.accept_terms": "Eu aceito os termos e condições",
		"signup.button": "Cadastrar",
		"signup.loading": "Criando conta...",
		"signup.or": "Ou cadastre-se com",
		"signup.google": "Cadastre-se com Google",
		"signup.already_account": "Já tem uma conta?",
		"signup.signin": "Entrar"
	},
	en: {
		"login.signin": "Sign in to",
		"login.email": "Email",
		"login.password": "Password",
		"login.button": "Sign in",
		"login.or": "or",
		"login.google": "Sign in with Google",
		"login.no_account": "Don't have an account?",
		"login.signup": "Sign up",
		"login.remember": "Keep me signed in",
		"index.welcome": "Welcome to",
		"index.description": "Your smart system for managing teacher availability.",
		"index.start": "Start",
		"footer.rights": "All rights reserved.",
		"footer.about": "About",
		"footer.contact": "Contact",
		"footer.privacy": "Privacy",
		"error.404.title": "404 - Page not found",
		"error.404.message": "The page you were looking for doesn't exist.",
		"error.404.back": "Go back home",
		"nav.we": "The Team",
		"nav.login": "Login",
		"nav.light": "Set to Light mode",
		"nav.dark": "Set to Dark mode",
		"nav.theme": "Toggle Theme",
		"signup.title": "Create your account",
		"signup.name": "Full name",
		"signup.email": "Email",
		"signup.password": "Password",
		"signup.confirmPassword": "Confirm password",
		"signup.accept_terms": "I accept the terms and conditions",
		"signup.button": "Sign Up",
		"signup.loading": "Creating account...",
		"signup.or": "Or sign up with",
		"signup.google": "Sign up with Google",
		"signup.already_account": "Already have an account?",
		"signup.signin": "Sign in"
	},
}

export function t(key: TranslationKey, lang: SupportedLang = "pt"): string {
	return translations[lang][key]
}
