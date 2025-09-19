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
	| "nav.profile"
	| "nav.logout"
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
	| "school.create_title"
	| "school.create_hint"
	| "school.default_name"
	| "school.error_create"
	| "school.error_unexpected"
	| "school.aria_label"
	| "school.tooltip"
	| "school.label"
	| "school.click_hint"
	| "school.creating"
	| "school.detail_title"
	| "school.detail_id"
	| "roles.title"
	| "roles.choose"
	| "roles.student"
	| "roles.teacher"
	| "roles.coordinator"
	| "roles.student_desc"
	| "roles.teacher_desc"
	| "roles.coordinator_desc"
	| "roles.confirm"
	| "dashboard.welcome"
	| "dashboard.no_role"
	| "dashboard.choose_role_button"
	| "dashboard.no_school"
	| "dashboard.create_school_button"
	| "dashboard.overview"
	| "dashboard.current_role"
	| "dashboard.current_school"
	| "dashboard.logout"
	| "dashboard.role.student"
	| "dashboard.role.teacher"
	| "dashboard.role.coordinator"
	| "dashboard.role.add_new"
	| "dashboard.school.add_new"

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
		"nav.logout": "Sair",
		"nav.profile": "Perfil",
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
		"signup.signin": "Entrar",
		"school.create_title": "Crie sua primeira escola",
		"school.create_hint": "Clique no ícone abaixo para começar",
		"school.default_name": "Minha primeira escola",
		"school.error_create": "Falha ao criar a escola",
		"school.error_unexpected": "Erro inesperado",
		"school.aria_label": "Criar escola",
		"school.tooltip": "Clique para criar uma escola",
		"school.label": "ESCOLA",
		"school.click_hint": "Clique para criar",
		"school.creating": "Criando escola…",
		"school.detail_title": "Escola",
		"school.detail_id": "ID",
		"roles.title": "Escolha seu papel",
		"roles.choose": "Selecione como você deseja usar o Kayozen",
		"roles.student": "Estudante",
		"roles.teacher": "Professor",
		"roles.coordinator": "Coordenador",
		"roles.student_desc": "Acesse materiais, veja horários e participe das aulas.",
		"roles.teacher_desc": "Gerencie aulas, disponibilize materiais e acompanhe alunos.",
		"roles.coordinator_desc": "Administre professores, turmas e toda a instituição.",
		"roles.confirm": "Confirmar",
		"dashboard.welcome": "Bem-vindo ao Kayozen",
		"dashboard.no_role": "Você ainda não possui um papel. Escolha um para continuar.",
		"dashboard.choose_role_button": "Escolher Papel",
		"dashboard.no_school": "Você ainda não possui uma escola. Crie uma para continuar.",
		"dashboard.create_school_button": "Criar Escola",
		"dashboard.overview": "Visão Geral do Painel",
		"dashboard.current_role": "Papel Atual",
		"dashboard.current_school": "Escola Atual",
		"dashboard.logout": "Sair",
		"dashboard.role.student": "Aluno",
		"dashboard.role.teacher": "Professor",
		"dashboard.role.coordinator": "Coordenador",
		"dashboard.role.add_new": "Adicionar novo papel",
		"dashboard.school.add_new": "Adicionar nova escola",

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
		"nav.logout": "Logout",
		"nav.profile": "Profile",
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
		"signup.signin": "Sign in",
		"school.create_title": "Create your first school",
		"school.create_hint": "Click the icon below to start",
		"school.default_name": "My first school",
		"school.error_create": "Failed to create school",
		"school.error_unexpected": "Unexpected error",
		"school.aria_label": "Create school",
		"school.tooltip": "Click to create a school",
		"school.label": "SCHOOL",
		"school.click_hint": "Click to create",
		"school.creating": "Creating school…",
		"school.detail_title": "School",
		"school.detail_id": "ID",
		"roles.title": "Choose your role",
		"roles.choose": "Select how you want to use Kayozen",
		"roles.student": "Student",
		"roles.teacher": "Teacher",
		"roles.coordinator": "Coordinator",
		"roles.student_desc": "Access materials, view schedules, and join classes.",
		"roles.teacher_desc": "Manage classes, provide materials, and track students.",
		"roles.coordinator_desc": "Manage teachers, classrooms, and the whole institution.",
		"roles.confirm": "Confirm",
		"dashboard.welcome": "Welcome to Kayozen",
		"dashboard.no_role": "You don’t have a role yet. Please choose one to continue.",
		"dashboard.choose_role_button": "Choose Role",
		"dashboard.no_school": "You don’t have a school yet. Please create one to continue.",
		"dashboard.create_school_button": "Create School",
		"dashboard.overview": "Dashboard Overview",
		"dashboard.current_role": "Current Role",
		"dashboard.current_school": "Current School",
		"dashboard.logout": "Logout",
		"dashboard.role.student": "Student",
		"dashboard.role.teacher": "Teacher",
		"dashboard.role.coordinator": "Coordinator",
		"dashboard.role.add_new": "Add new role",
		"dashboard.school.add_new": "Add new school",
	},
}

export function t(key: TranslationKey, lang: SupportedLang = "pt"): string {
	return translations[lang][key]
}
