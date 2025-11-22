import { Plan } from "../utils/interfaces.ts"
import { useTranslationContext } from "./TranslationContext.tsx"

export default function Plans(
	{ plans }: { plans: Plan[] },
) {
	const { t } = useTranslationContext()
	return (
		<main class="flex-grow max-w-5xl mx-auto p-6 mt-10 animate-fadeIn">
			<h1 class="text-3xl font-bold text-center mb-3">
				{t("billing.title")}
			</h1>

			<p class="text-center text-kayozen-light-muted dark:text-kayozen-dark-muted mb-10">
				{t("billing.subtitle")}
			</p>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				{plans.map((plan) => (
					<div class="rounded-2xl p-6 shadow-md bg-kayozen-light-surface dark:bg-kayozen-dark-surface border border-kayozen-light-border dark:border-kayozen-dark-border flex flex-col justify-between">
						<div>
							<h2 class="text-xl font-semibold mb-2">
								{t(`billing.${plan.key}`)}
							</h2>

							<p class="text-3xl font-bold mb-4">{plan.price}</p>

							<p class="text-sm text-kayozen-light-muted dark:text-kayozen-dark-muted mb-6">
								{t(`billing.${plan.key}_desc`)}
							</p>
						</div>

						<a
							href={plan.url}
							target="_blank"
							rel="noopener noreferrer"
							class="w-full text-center py-3 rounded-xl bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white font-medium hover:opacity-90 transition"
						>
							{t("billing.choose_plan")}
						</a>
					</div>
				))}
			</div>
		</main>
	)
}
