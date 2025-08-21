import { useTranslationContext } from "./TranslationContext.tsx"

export default function LoginBox() {
	const { t } = useTranslationContext()

	return (
		<div>
			<div class="w-screen max-w-md bg-kayozen-light-surface dark:bg-kayozen-dark-surface p-8 rounded-lg shadow-md relative">
				<h1 class="text-2xl font-bold text-center mb-6 ">
					{t("login.signin") + " "}
					<span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
						Kayozen
					</span>
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

					<div class="flex items-center">
						<input
							id="remember"
							name="remember"
							type="checkbox"
							class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="remember"
							class="ml-2 block text-sm text-gray-700 dark:text-gray-300"
						>
							{t("login.remember")}
						</label>
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
					<span class="mx-4 text-kayozen-light-muted dark:kayozen-dark-muted text-sm">
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

				<p class="text-center text-sm text-kayozen-light-muted dark:kayozen-dark-muted mt-6">
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
	)
}
