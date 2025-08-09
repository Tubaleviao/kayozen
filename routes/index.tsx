import { Button } from "../islands/Button.tsx"
import Navbar from "../islands/Navbar.tsx"

export default function Home() {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar itens={[{ name: "Quem Somos", page: "/sobre" }]} />

			<main class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
				<h1 class="text-4xl font-bold mb-4">
					Bem-vindo ao{" "}
					<span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
						Kayozen
					</span>
				</h1>
				<p class="text-lg text-kayozen-light-muted dark:text-kayozen-dark-muted mb-6">
					Seu sistema inteligente para gestão de disponibilidade de professores.
				</p>

				<Button to="/login">
					sdfgsdfgdfg
				</Button>
			</main>

			{/* Footer */}
			<footer class="bg-kayozen-dark border-t border-white/10 mt-8">
				<div class="max-w-screen-lg mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
					<p class="text-gray-300 text-sm">
						© {new Date().getFullYear()} Kayozen. Todos os direitos reservados.
					</p>
					<ul class="flex gap-4 text-gray-300 text-sm">
						<li>
							<a href="/sobre" class="hover:text-white transition">Sobre</a>
						</li>
						<li>
							<a href="/contato" class="hover:text-white transition">Contato</a>
						</li>
						<li>
							<a href="/privacidade" class="hover:text-white transition">
								Privacidade
							</a>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	)
}
