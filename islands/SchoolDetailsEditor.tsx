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

			if (!res.ok) {
				throw new Error("save_failed")
			}

			toast.success(t("school.update_success"))
		} catch {
			toast.error(t("school.update_error"))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class="space-y-6 max-w-md mx-auto">
			<div class="space-y-2">
				<label class="block text-sm font-medium">
					{t("school.form.name")}
				</label>
				<input
					value={name}
					onInput={(e) => setName((e.target as HTMLInputElement).value)}
					class="w-full px-3 py-2 rounded border bg-transparent"
				/>
			</div>

			<div class="space-y-2">
				<label class="block text-sm font-medium">
					{t("school.form.cnpj")}
				</label>
				<input
					value={cnpj}
					onInput={(e) => setCnpj((e.target as HTMLInputElement).value)}
					class="w-full px-3 py-2 rounded border bg-transparent"
				/>
			</div>

			<button
				onClick={save}
				disabled={loading}
				class="w-full py-2 rounded bg-kayozen-light-primary dark:bg-kayozen-dark-primary text-white font-semibold disabled:opacity-50"
			>
				{loading ? t("common.saving") : t("common.save")}
			</button>
		</div>
	)
}
