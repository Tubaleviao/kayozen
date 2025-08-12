import { Button } from "../islands/Button.tsx"
import Footer from "../islands/Footer.tsx"
import Navbar from "../islands/Navbar.tsx"
import { t } from "../utils/i18n.ts"

export default function Home() {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar />

			<main class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
				<h1 class="text-4xl font-bold mb-4">
					{`${t("index.welcome")} `}
					<span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
						Kayozen
					</span>
				</h1>
				<p class="text-lg text-kayozen-light-muted dark:text-kayozen-dark-muted mb-6">
					Seu sistema inteligente para gestão de disponibilidade de professores.
				</p>

				<Button to="/login">
					Começar
				</Button>
			</main>

			<Footer />
		</div>
	)
}
