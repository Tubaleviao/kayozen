import { useState } from "preact/hooks"
import { useTheme } from "../hooks/useTheme.ts"

interface NavbarProps {
	itens?: { name: string; page: string }[]
}

export default function Navbar({ itens = [] }: NavbarProps) {
	const [menuOpen, setMenuOpen] = useState(false)
		const { darkMode, toggleTheme } = useTheme()

	return (
		<nav class={ (darkMode ? "bg-kayozen-bg-dark text-white" : "bg-kayozen-bg-light text-black") + " shadow-md"}>
			<div class="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo / Inicio */}
				<a href="/" class={(darkMode ? "text-kayozen-title-light": "text-kayozen-title-dark") + " text-lg font-bold"}>
					Kayozen
				</a>

				{/* Botão Hamburguer (mobile) */}
				<button
					class="lg:hidden p-2 rounded hover:bg-white/10 transition"
					onClick={() => setMenuOpen(!menuOpen)}
				>
					{/* Ícone */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				{/* Menu Desktop */}
				<ul class="hidden lg:flex gap-6">
					<li>
						<a href="/" class="hover:text-kayozen-accent transition">Início</a>
					</li>
					<li>
						<a href="/sobre" class="hover:text-kayozen-accent transition">
							Quem somos
						</a>
					</li>
					{itens.map((item) => (
						<li>
							<a href={item.page} class="hover:text-kayozen-accent transition">
								{item.name}
							</a>
						</li>
					))}
					<li>
						<a
							href="/login"
							class="px-4 py-2 bg-kayozen-green rounded hover:bg-emerald-600 transition"
						>
							Login
						</a>
					</li>
					<li>
						<button
							type="button"
							onClick={toggleTheme}
							class="p-2 rounded-full hover:opacity-80 transition"
							aria-label="Toggle Theme"
						>
							{darkMode ? "☀️" : "🌙"}
						</button>
					</li>
				</ul>
			</div>

			{/* Menu Mobile */}
			{menuOpen && (
				<div class="lg:hidden px-4 pb-4 animate-fadeIn">
					<ul class="flex flex-col gap-3">
						<li>
							<a href="/" class="hover:text-kayozen-accent transition">
								Início
							</a>
						</li>
						<li>
							<a href="/sobre" class="hover:text-kayozen-accent transition">
								Quem somos
							</a>
						</li>
						{itens.map((item) => (
							<li>
								<a
									href={item.page}
									class="hover:text-kayozen-accent transition"
								>
									{item.name}
								</a>
							</li>
						))}
						<li>
							<a
								href="/login"
								class="px-4 py-2 border border-kayozen-accent text-kayozen-accent rounded hover:bg-kayozen-accent hover:text-white transition"
							>
								Login
							</a>
						</li>
					</ul>
				</div>
			)}
		</nav>
	)
}
