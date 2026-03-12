import { tFunction } from "./interfaces.ts"

export type SupportedLang = "pt" | "en"

// Traduções (dinâmicas, sem precisar listar todas as keys manualmente)
export const translations = {
	pt: {
		about: {
			hero: {
				title: "Sobre o",
				brand: "Kayozen",
				description:
					"O Kayozen foi criado para tornar a gestão da disponibilidade de professores simples, transparente e sem estresse — tanto para escolas quanto para educadores.",
			},

			mission: {
				title: "Por que criamos o Kayozen",
				description:
					"Vimos escolas lidando com planilhas, mensagens no WhatsApp, mudanças de última hora e processos manuais que consomem tempo e geram confusão. O Kayozen existe para substituir esse caos por clareza — ajudando escolas a organizar a disponibilidade e professores a manterem o controle de seus horários.",
			},

			values: {
				title: "No que acreditamos",
				items: {
					simplicity: "Simplicidade acima da complexidade",
					time: "Respeito ao tempo dos professores",
					clarity: "Comunicação clara e transparente",
					feedback: "Melhoria contínua através de feedback",
				},
			},
		},
		billing: {
			title: "Escolha seu plano",
			subtitle: "Escolha o plano que melhor atende sua escola.",
			choose_plan: "Selecionar plano",

			free: "Gratuito",
			free_desc:
				"Este é o plano que todos tem por padrão: Permite a criação de uma escola.",
			basic: "Básico",
			basic_desc:
				"Ideal para escolas pequenas. Inclui até 2 escolas e 2 funções.",

			pro: "Pro",
			pro_desc: "Para escolas em crescimento, com recursos ilimitados.",

			enterprise: "Enterprise",
			enterprise_desc:
				"Soluções completas com recursos ilimitados e personalizações para grandes instituições, entraremos em contato.",
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
			error: "Erro ao fazer login: {e}",
		},
		index: {
			welcome: "Bem-vindo ao",
			description:
				"Seu sistema inteligente para gestão de disponibilidade de professores.",
			start: "Começar",
			add_prof: "Adicionar Professor",
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
			about: "Sobre",
			login: "Login",
			light: "Mudar para o Modo Claro",
			dark: "Mudar para o Modo Escuro",
			theme: "Alternar tema",
			logout: "Sair",
			profile: "Perfil",
			plans: "Planos",
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
			edit_title: "Editar escola",
			field_name: "Nome da escola",
			field_cnpj: "CNPJ (opcional)",
			error_name_required: "O nome da escola é obrigatório",
			success_create: "Escola criada com sucesso!",
			update_success: "Escola atualizada com sucesso!",
			update_error: "Erro ao atualizar a escola",
			form: {
				name: "Nome da escola",
				cnpj: "CNPJ",
				save: "Salvar alterações",
			},
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
			professor_created: "Professor criado com sucesso!",
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
				edit: "Editar escola",
			},
			modal: {
				new_professor: "Novo Professor",
				create: "Criar",
				cancel: "Cancelar",
				optional_email: "Email (Opcional)",
				name: "Nome",
				subject: "Disciplina",
				fictitious: "Fictício",
			},
		},
		db_offline: {
			title: "Banco de Dados Offline",
			description:
				"Nosso banco de dados está indisponível no momento. Tente novamente mais tarde.",
		},
		common: {
			save: "Save",
			saving: "Saving...",
		},
	},
	en: {
		about: {
			hero: {
				title: "About",
				brand: "Kayozen",
				description:
					"Kayozen was created to make managing teacher availability simple, transparent, and stress-free — for schools and educators alike.",
			},

			mission: {
				title: "Why we built it",
				description:
					"We saw schools struggling with spreadsheets, WhatsApp messages, last-minute changes, and manual processes that consume time and create confusion. Kayozen exists to replace that chaos with clarity — helping schools organize availability and helping teachers keep control over their schedules.",
			},

			values: {
				title: "What we believe in",
				items: {
					simplicity: "Simplicity over complexity",
					time: "Respect for teachers’ time",
					clarity: "Clear communication and transparency",
					feedback: "Continuous improvement through feedback",
				},
			},
		},
		billing: {
			title: "Choose your plan",
			subtitle: "Select the plan that best fits your school.",
			choose_plan: "Choose plan",

			free: "Free",
			free_desc: "This is the default plan: Allow the creation of 1 school.",
			basic: "Basic",
			basic_desc:
				"Ideal for small schools. Includes up to 2 schools and 2 roles.",

			pro: "Pro",
			pro_desc: "For growing schools, with unlimited features.",

			enterprise: "Enterprise",
			enterprise_desc:
				"Unlimited resources and complete and customized solutions for large institutions, we'll get in touch.",
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
			error: "Login error: {e}",
		},
		index: {
			welcome: "Welcome to",
			description: "Your smart system for managing teacher availability.",
			start: "Start",
			add_prof: "Add Professor",
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
			about: "About",
			login: "Login",
			light: "Set to Light mode",
			dark: "Set to Dark mode",
			theme: "Toggle Theme",
			logout: "Logout",
			profile: "Profile",
			plans: "Pricing",
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
			edit_title: "Edit school",
			field_name: "School name",
			field_cnpj: "CNPJ (optional)",
			error_name_required: "School name is required",
			success_create: "School created successfully!",
			update_success: "School updated successfully!",
			update_error: "Failed to update school",
			form: {
				name: "School name",
				cnpj: "CNPJ",
				save: "Save changes",
			},
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
			professor_created: "Professor created successfully!",
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
				edit: "Edit school",
			},
			modal: {
				new_professor: "New Professor",
				create: "Create",
				cancel: "Cancel",
				optional_email: "Email (Optional)",
				name: "Name",
				subject: "Subject",
				fictitious: "Fictitious",
			},
		},
		db_offline: {
			title: "Database Offline",
			description:
				"Our database is currently unreachable. Please try again later.",
		},
		common: {
			save: "Save",
			saving: "Saving...",
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
