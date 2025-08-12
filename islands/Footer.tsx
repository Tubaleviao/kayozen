import type { SupportedLang } from "../utils/i18n.ts"
import { useTranslationContext } from "./TranslationContext.tsx"

export default function Footer() {
	const { t, lang, setLang } = useTranslationContext()

	const handleChange = (e: Event) => {
		const value = (e.target as HTMLSelectElement).value as SupportedLang
		setLang(value)
	}

	return (
		<footer class="border-t border-white/10 mt-8">
			<div class="max-w-screen-lg mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-kayozen-light-muted dark:kayozen-dark-muted text-sm">
					© {new Date().getFullYear()} Kayozen. {t("footer.rights")}
				</p>

				<ul class="flex gap-4 text-kayozen-light-muted dark:kayozen-dark-muted text-sm items-center">
					<li>
						<a
							href="/about"
							class="hover:text-kayozen-light-secondary dark:hover:kayozen-dark-secondary transition"
						>
							{t("footer.about")}
						</a>
					</li>
					<li>
						<a
							href="/contact"
							class="hover:text-kayozen-light-secondary dark:hover:kayozen-dark-secondary transition"
						>
							{t("footer.contact")}
						</a>
					</li>
					<li>
						<a
							href="/privacy"
							class="hover:text-kayozen-light-secondary dark:hover:kayozen-dark-secondary transition"
						>
							{t("footer.privacy")}
						</a>
					</li>
					<li>
						<select
							value={lang}
							onChange={handleChange}
							class="bg-transparent border border-gray-400 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-kayozen-light-secondary dark:focus:ring-kayozen-dark-secondary"
						>
							<option value="pt">🇧🇷 Português</option>
							<option value="en">🇺🇸 English</option>
						</select>
					</li>
				</ul>
			</div>
		</footer>
	)
}
