export type SupportedLang = "pt" | "en"

// Traduções (dinâmicas, sem precisar listar todas as keys manualmente)
export const translations = {
	pt: {
		billing: {
			title: "Escolha seu plano",
			subtitle: "Escolha o plano que melhor atende sua escola.",
			choose_plan: "Selecionar plano",

			basic: "Básico",
			basic_desc:
				"Ideal para escolas pequenas. Inclui até 5 professores e 2 escolas.",

			pro: "Pro",
			pro_desc: "Para escolas em crescimento, com recursos ilimitados.",

			enterprise: "Enterprise",
			enterprise_desc:
				"Soluções completas e personalizadas para grandes instituições.",
			contact_us: "Fale conosco",
		},
		login: {
			signin: "Entrar no",
			email: "E-mail",
			password: "Senha",
			button: "Entrar",
			or: "ou",
			google: "Entrar com Google",
			no_account: "Não tem uma conta?",
			signup: "Cadastre-se",
			remember: "Manter conectado",
		},
		index: {
			welcome: "Bem-vindo ao",
			description:
				"Seu sistema inteligente para gestão de disponibilidade de professores.",
			start: "Começar",
			add_prof: "Adicionar Professor"
		},
		footer: {
			rights: "Todos os direitos reservados.",
			about: "Sobre",
			contact: "Contato",
			privacy: "Privacidade",
		},
		error: {
			"404": {
				title: "404 - Página não encontrada",
				message: "A página que você procura não existe.",
				back: "Voltar para a página inicial",
			},
			"500": {
				title: "500 - Erro Interno do Servidor",
				description:
					"Algo deu errado do nosso lado. Por favor, tente novamente em alguns instantes.",
			},
		},
		nav: {
			we: "Quem Somos",
			login: "Login",
			light: "Mudar para o Modo Claro",
			dark: "Mudar para o Modo Escuro",
			theme: "Alternar tema",
			logout: "Sair",
			profile: "Perfil",
		},
		signup: {
			title: "Crie sua conta",
			name: "Nome",
			email: "Email",
			password: "Senha",
			confirmPassword: "Confirmar senha",
			accept_terms: "Eu aceito os termos e condições",
			button: "Cadastrar",
			loading: "Criando conta...",
			or: "Ou cadastre-se com",
			google: "Cadastre-se com Google",
			already_account: "Já tem uma conta?",
			signin: "Entrar",
		},
		school: {
			create_title: "Crie sua primeira escola",
			create_hint: "Clique no ícone abaixo para começar",
			default_name: "Minha primeira escola",
			error_create: "Falha ao criar a escola",
			error_unexpected: "Erro inesperado",
			aria_label: "Criar escola",
			tooltip: "Clique para criar uma escola",
			label: "ESCOLA",
			click_hint: "Clique para criar",
			creating: "Criando escola…",
			detail_title: "Escola",
			detail_id: "ID",
		},
		roles: {
			title: "Escolha seu papel",
			choose: "Selecione como você deseja usar o Kayozen",
			student: "Estudante",
			teacher: "Professor",
			coordinator: "Coordenador",
			student_desc: "Acesse materiais, veja horários e participe das aulas.",
			teacher_desc:
				"Gerencie aulas, disponibilize materiais e acompanhe alunos.",
			coordinator_desc: "Administre professores, turmas e toda a instituição.",
			confirm: "Confirmar",
		},
		dashboard: {
			welcome: "Bem-vindo ao Kayozen",
			no_role: "Você ainda não possui um papel. Escolha um para continuar.",
			choose_role_button: "Escolher Papel",
			no_school: "Você ainda não possui uma escola. Crie uma para continuar.",
			create_school_button: "Criar Escola",
			overview: "Visão Geral do Painel",
			current_role: "Papel Atual",
			current_school: "Escola Atual",
			logout: "Sair",
			role: {
				student: "Aluno",
				teacher: "Professor",
				coordinator: "Coordenador",
				add_new: "Adicionar novo papel",
			},
			school: {
				add_new: "Adicionar nova escola",
			},
			modal: {
				new_professor: "Novo Professor",
				create: "Criar",
				cancel: "Cancelar",
				optional_email: "Email (Opcional)",
				name: "Nome"
			}
		},
		db_offline: {
			title: "Banco de Dados Offline",
			description:
				"Nosso banco de dados está indisponível no momento. Tente novamente mais tarde.",
		},
	},
	en: {
		billing: {
			title: "Choose your plan",
			subtitle: "Select the plan that best fits your school.",
			choose_plan: "Choose plan",

			basic: "Basic",
			basic_desc:
				"Ideal for small schools. Includes up to 5 teachers and 2 schools.",

			pro: "Pro",
			pro_desc: "For growing schools, with unlimited features.",

			enterprise: "Enterprise",
			enterprise_desc:
				"Complete and customized solutions for large institutions.",
			contact_us: "Contact us",
		},
		login: {
			signin: "Sign in to",
			email: "Email",
			password: "Password",
			button: "Sign in",
			or: "or",
			google: "Sign in with Google",
			no_account: "Don't have an account?",
			signup: "Sign up",
			remember: "Keep me signed in",
		},
		index: {
			welcome: "Welcome to",
			description: "Your smart system for managing teacher availability.",
			start: "Start",
			add_prof: "Add Professor"
		},
		footer: {
			rights: "All rights reserved.",
			about: "About",
			contact: "Contact",
			privacy: "Privacy",
		},
		error: {
			"404": {
				title: "404 - Page not found",
				message: "The page you were looking for doesn't exist.",
				back: "Go back home",
			},
			"500": {
				title: "500 - Server Error",
				description:
					"Something went wrong on our side. Please try again in a few moments.",
			},
		},
		nav: {
			we: "The Team",
			login: "Login",
			light: "Set to Light mode",
			dark: "Set to Dark mode",
			theme: "Toggle Theme",
			logout: "Logout",
			profile: "Profile",
		},
		signup: {
			title: "Create your account",
			name: "Full name",
			email: "Email",
			password: "Password",
			confirmPassword: "Confirm password",
			accept_terms: "I accept the terms and conditions",
			button: "Sign Up",
			loading: "Creating account...",
			or: "Or sign up with",
			google: "Sign up with Google",
			already_account: "Already have an account?",
			signin: "Sign in",
		},
		school: {
			create_title: "Create your first school",
			create_hint: "Click the icon below to start",
			default_name: "My first school",
			error_create: "Failed to create school",
			error_unexpected: "Unexpected error",
			aria_label: "Create school",
			tooltip: "Click to create a school",
			label: "SCHOOL",
			click_hint: "Click to create",
			creating: "Creating school…",
			detail_title: "School",
			detail_id: "ID",
		},
		roles: {
			title: "Choose your role",
			choose: "Select how you want to use Kayozen",
			student: "Student",
			teacher: "Teacher",
			coordinator: "Coordinator",
			student_desc: "Access materials, view schedules, and join classes.",
			teacher_desc: "Manage classes, provide materials, and track students.",
			coordinator_desc:
				"Manage teachers, classrooms, and the whole institution.",
			confirm: "Confirm",
		},
		dashboard: {
			welcome: "Welcome to Kayozen",
			no_role: "You don’t have a role yet. Please choose one to continue.",
			choose_role_button: "Choose Role",
			no_school: "You don’t have a school yet. Please create one to continue.",
			create_school_button: "Create School",
			overview: "Dashboard Overview",
			current_role: "Current Role",
			current_school: "Current School",
			logout: "Logout",
			role: {
				student: "Student",
				teacher: "Teacher",
				coordinator: "Coordinator",
				add_new: "Add new role",
			},
			school: {
				add_new: "Add new school",
			},
			modal: {
				new_professor: "New Professor",
				create: "Create",
				cancel: "Cancel",
				optional_email: "Email (Optional)",
				name: "Name"
			}
		},
		db_offline: {
			title: "Database Offline",
			description:
				"Our database is currently unreachable. Please try again later.",
		},
	},
} as const

// 🔑 Tipagem dinâmica baseada no objeto acima
export type TranslationKey = NestedKeyOf<typeof translations["pt"]>

// Função utilitária para acessar objetos aninhados com "dot notation"
function getNested(obj: any, key: string): string | undefined {
	return key.split(".").reduce((acc, part) => acc?.[part], obj)
}

// Função de tradução com fallback e interpolação
export function t(
	key: TranslationKey,
	lang: SupportedLang = "pt",
	vars?: Record<string, string | number>,
): string {
	let text = getNested(translations[lang], key) ??
		getNested(translations["en"], key) ?? key

	if (vars) {
		Object.entries(vars).forEach(([k, v]) => {
			text = text.replace(new RegExp(`{${k}}`, "g"), String(v))
		})
	}

	return text
}

// 🔧 Tipagem para chaves aninhadas ("login.email" etc.)
type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
		? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
		: `${Key}`
}[keyof ObjectType & (string | number)]
