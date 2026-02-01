import { useState } from "preact/hooks"
import { useTranslationContext } from "./TranslationContext.tsx"
import { useToast } from "./ToastProvider.tsx"
import { School } from "../utils/interfaces.ts"

interface Props {
	school: School
}

export default function SchoolDetailsEditor({ school }: Props) {
	const { t } = useTranslationContext()
	const toast = useToast()

	const [name, setName] = useState(school.name)
	const [cnpj, setCnpj] = useState(school.cnpj)
	const [loading, setLoading] = useState(false)

	async function save() {
		try {
			setLoading(true)

			const res = await fetch(`/schools/${school.id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, cnpj }),
			})

			if (!res.ok) throw new Error("save_failed")

			toast.success(t("school.update_success"))
		} catch {
			toast.error(t("school.update_error"))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class="w-screen max-w-md mx-auto bg-kayozen-light-surface dark:bg-kayozen-dark-surface p-8 rounded-lg shadow-md">
			<h1 class="text-2xl font-bold text-center mb-6">
				{t("school.edit_title")}
			</h1>

			<div class="space-y-4">
				{/* School name */}
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						{t("school.form.name")}
					</label>
					<input
						value={name}
						onInput={(e) => setName((e.target as HTMLInputElement).value)}
						class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kayozen-light-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>

				{/* CNPJ */}
				<div>
					<label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
						{t("school.form.cnpj")}
					</label>
					<input
						value={cnpj}
						onInput={(e) => setCnpj((e.target as HTMLInputElement).value)}
						class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kayozen-light-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>

				{/* Action */}
				<button
					type="button"
					onClick={save}
					disabled={loading}
					class="w-full mt-2 bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
				>
					{loading ? t("common.saving") : t("common.save")}
				</button>
			</div>
		</div>
	)
}
