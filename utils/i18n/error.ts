export const error = {
	pt: {
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
	en: {
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
} as const
