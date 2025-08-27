import { useState } from "preact/hooks"
import { useTheme } from "../hooks/useTheme.ts"
import { Button } from "./Button.tsx"
import { useTranslationContext } from "./TranslationContext.tsx"
import { TranslationKey } from "../utils/i18n.ts"

interface NavbarProps {
	user?: User | null
	itens?: { key: TranslationKey; page: string }[]
}

interface User {
	name: string
	email: string
	avatarUrl?: string
}

export default function Navbar(
	{
		itens = [{ key: "nav.we", page: "/about" }],
		user,
	}: NavbarProps,
) {
	const { t } = useTranslationContext()
	const [menuOpen, setMenuOpen] = useState(false)
	const { darkMode, toggleTheme } = useTheme()

	return (
		<nav class="bg-kayozen-light-surface text-kayozen-light-text 
      dark:bg-kayozen-dark-surface dark:text-kayozen-dark-text shadow-md">
			<div class="max-w-screen-lg mx-auto px-4 py-3 flex items-center justify-between">
				<a
					href="/"
					class="text-kayozen-light-text dark:text-kayozen-dark-text text-lg font-bold"
				>
					Kayozen
				</a>

				<Button
					class="lg:hidden p-2 rounded hover:bg-white/10 transition"
					onClick={() => setMenuOpen(!menuOpen)}
				>
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
				</Button>

				{/* Menu Desktop */}
				<ul class="hidden lg:flex gap-6">
					{itens.map((item) => (
						<li>
							<a
								href={item.page}
								class="hover:text-kayozen-light-primary dark:hover:text-kayozen-dark-primary transition"
							>
								{t(item.key)}
							</a>
						</li>
					))}
					<li>
						<button
							type="button"
							onClick={toggleTheme}
							class="rounded-full hover:opacity-80 transition"
							aria-label={t("nav.theme")}
							title={darkMode ? t("nav.light") : t("nav.dark")}
						>
							{darkMode ? "☀️" : "🌙"}
						</button>
					</li>

					{/* Avatar / Login */}
					<li>
						{user
							? (
								<a href="/profile" class="flex items-center gap-2">
									<img
										src={user.avatarUrl ?? "/user.svg"}
										alt={user.name}
										title={user.name}
										class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
									/>
								</a>
							)
							: (
								<a
									href="/login"
									class="px-4 py-2 bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white rounded-lg hover:opacity-90 transition"
								>
									{t("nav.login")}
								</a>
							)}
					</li>
				</ul>
			</div>

			{/* Menu Mobile */}
			{menuOpen && (
				<div class="lg:hidden px-4 pb-4 animate-fadeIn">
					<ul class="flex flex-col gap-3">
						{itens.map((item) => (
							<li>
								<a
									href={item.page}
									class="hover:text-kayozen-light-primary dark:hover:text-kayozen-dark-primary transition"
								>
									{t(item.key)}
								</a>
							</li>
						))}
						<li>
							{user
								? (
									<a href="/profile" class="flex items-center gap-2">
										<img
											src={user.avatarUrl ?? "/user.svg"}
											alt={user.name}
											class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600"
										/>
										<span>{user.name}</span>
									</a>
								)
								: (
									<a
										href="/login"
										class="px-4 py-2 bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white rounded-lg hover:opacity-90 transition"
									>
										{t("nav.login")}
									</a>
								)}
						</li>
					</ul>
				</div>
			)}
		</nav>
	)
}
