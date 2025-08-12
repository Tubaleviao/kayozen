import { useTranslationContext } from "./TranslationContext.tsx"

export default function LoginBox() {
	const { t } = useTranslationContext()

	return (
		<div>
			<div class="flex-grow bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
				<div class="w-screen max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md relative">
					<h1 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
						{t("login.title")}
					</h1>

					<form method="POST" action="/api/login/email" class="space-y-4">
						<div>
							<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
								{t("login.email")}
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
								{t("login.password")}
							</label>
							<input
								type="password"
								name="password"
								required
								class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
							/>
						</div>

						<button
							type="submit"
							class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
						>
							{t("login.button")}
						</button>
					</form>

					<div class="flex items-center my-6">
						<div class="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
						<span class="mx-4 text-gray-500 dark:text-gray-400 text-sm">
							{t("login.or")}
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
						<span>{t("login.google")}</span>
					</a>

					<p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
						{t("login.no_account")}{" "}
						<a
							href="#"
							class="text-blue-600 dark:text-blue-400 hover:underline"
						>
							{t("login.signup")}
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}
