import { JSX } from "preact"
import { defineTFunction } from "@/utils/i18n/index.ts"
import { KayozenState } from "@/utils/interfaces.ts"
import { setCookie } from "@/utils/cookies.ts"

interface FooterProps {
	state: KayozenState
}

export default function Footer({ state }: FooterProps) {
	const t = defineTFunction(state.lang)

	const handleChange = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
		setCookie("kayolang", e.currentTarget.value)
		location.reload()
	}

	return (
		<footer class="border-t border-light-muted/20 dark:border-dark-muted/20 mt-8">
			<div class="max-w-(--breakpoint-lg) mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
				<p class="text-light-muted dark:kayozen-dark-muted text-sm">
					© {new Date().getFullYear()} Kayozen. {t("footer.rights")}
				</p>

				<ul class="flex gap-4 text-light-muted dark:text-dark-muted text-sm items-center">
					<li>
						<a
							href="/about"
							class="hover:text-light-secondary dark:hover:text-dark-secondary transition"
						>
							{t("footer.about")}
						</a>
					</li>
					<li>
						<a
							href="/contact"
							class="hover:text-light-secondary dark:hover:text-dark-secondary transition"
						>
							{t("footer.contact")}
						</a>
					</li>
					<li>
						<a
							href="/privacy"
							class="hover:text-light-secondary dark:hover:kayozen-dark-secondary transition"
						>
							{t("footer.privacy")}
						</a>
					</li>
					<li>
						<select
							value={state.lang}
							onInput={handleChange}
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
