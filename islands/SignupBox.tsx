import { useTranslationContext } from "./TranslationContext.tsx"
import { useState } from "preact/hooks"

export default function SignupBox() {
	const { t } = useTranslationContext()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function handleSubmit(e: Event) {
		e.preventDefault()
		setLoading(true)
		setError(null)

		const form = e.target as HTMLFormElement
		const formData = new FormData(form)

		const body = {
			name: formData.get("name"),
			email: formData.get("email"),
			password: formData.get("password"),
			confirmPassword: formData.get("confirmPassword"),
			acceptTerms: formData.get("acceptTerms") === "on",
		}

		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})

			if (!res.ok) {
				const errorResponse = new Response(res.body)
				const errorJson = await errorResponse.json()
				throw new Error(errorJson?.error || "Signup failed")
			}

			// Exemplo: redirecionar ao dashboard
			window.location.href = "/dashboard"
		} catch (err) {
			setError("⚠️ " + (err instanceof Error ? err.message : "Unknown error"))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<div class="w-screen max-w-md bg-kayozen-light-surface dark:bg-kayozen-dark-surface p-8 rounded-lg shadow-md relative">
				<h1 class="text-2xl font-bold text-center mb-6">
					{t("signup.title") + " "}
					<span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
						Kayozen
					</span>
				</h1>

				<form onSubmit={handleSubmit} class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							{t("signup.name")}
						</label>
						<input
							type="text"
							name="name"
							required
							class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							{t("signup.email")}
						</label>
						<input
							type="email"
							name="email"
							required
							class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							{t("signup.password")}
						</label>
						<input
							type="password"
							name="password"
							required
							class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
							{t("signup.confirmPassword")}
						</label>
						<input
							type="password"
							name="confirmPassword"
							required
							class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
						/>
					</div>

					<div class="flex items-center">
						<input
							id="acceptTerms"
							name="acceptTerms"
							type="checkbox"
							class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="acceptTerms"
							class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
						>
							{t("signup.accept_terms")}
						</label>
					</div>

					<button
						type="submit"
						disabled={loading}
						class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
					>
						{loading ? t("signup.loading") : t("signup.button")}
					</button>

					{error && <p class="text-red-500 text-sm mt-2">{error}</p>}
				</form>

				<div class="flex items-center my-6">
					<div class="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
					<span class="mx-4 text-kayozen-light-muted dark:text-kayozen-dark-muted text-sm">
						{t("signup.or")}
					</span>
					<div class="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
				</div>

				<a
					href="/api/login"
					class="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 shadow"
				>
					<img
						src="https://www.svgrepo.com/show/475656/google-color.svg"
						alt="Google logo"
						class="w-5 h-5"
					/>
					<span>{t("signup.google")}</span>
				</a>

				<p class="text-center text-sm text-kayozen-light-muted dark:text-kayozen-dark-muted mt-6">
					{t("signup.already_account")}{" "}
					<a
						href="/login"
						class="text-blue-600 dark:text-blue-400 hover:underline"
					>
						{t("signup.signin")}
					</a>
				</p>
			</div>
		</div>
	)
}
