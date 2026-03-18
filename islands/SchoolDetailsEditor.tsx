import { useState } from "preact/hooks"
import { School } from "../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"

interface Props {
	school: School
	lang: SupportedLang
}

export default function SchoolDetailsEditor({ school, lang }: Props) {
	const t = defineTFunction(lang)
	const [name, setName] = useState(school.name)
	const [cnpj, setCnpj] = useState(school.cnpj)
	const [loading, setLoading] = useState(false)

	function formatCNPJ(value: string) {
		const digits = value.replace(/\D/g, "").slice(0, 14)

		return digits
			.replace(/^(\d{2})(\d)/, "$1.$2")
			.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
			.replace(/\.(\d{3})(\d)/, ".$1/$2")
			.replace(/(\d{4})(\d)/, "$1-$2")
	}

	function isValidCNPJ(cnpj: string): boolean {
		const cleaned = cnpj.replace(/\D/g, "")

		if (cleaned.length !== 14) return false
		if (/^(\d)\1+$/.test(cleaned)) return false

		const calcCheck = (base: string, factors: number[]) => {
			let sum = 0
			for (let i = 0; i < factors.length; i++) {
				sum += Number(base[i]) * factors[i]
			}
			const result = sum % 11
			return result < 2 ? 0 : 11 - result
		}

		const base = cleaned.slice(0, 12)

		const digit1 = calcCheck(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
		const digit2 = calcCheck(base + digit1, [
			6,
			5,
			4,
			3,
			2,
			9,
			8,
			7,
			6,
			5,
			4,
			3,
			2,
		])

		return cleaned === base + digit1 + digit2
	}

	async function save() {
		try {
			if (!isValidCNPJ(cnpj ?? "")) {
				globalThis.toast?.("Invalid CNPJ", "error")
				return
			}
			setLoading(true)

			const res = await fetch(`/api/schools/${school.id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, cnpj }),
			})

			if (!res.ok) throw new Error("save_failed")

			globalThis.toast?.(t("school.update_success"))
		} catch {
			globalThis.toast?.(t("school.update_error"), "error")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class="w-screen max-w-md mx-auto bg-light-surface dark:bg-dark-surface p-8 rounded-lg shadow-md">
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
						inputmode="numeric"
						pattern="\d*"
						placeholder="00.000.000/0000-00"
						maxlength={18}
						value={cnpj}
						onInput={(e) => {
							const value = formatCNPJ((e.target as HTMLInputElement).value)
							setCnpj(value)
						}}
						class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-kayozen-light-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
					/>
				</div>

				{/* Action */}
				<button
					type="button"
					onClick={save}
					disabled={loading}
					class="w-full mt-2 bg-light-primary text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
				>
					{loading ? t("common.saving") : t("common.save")}
				</button>
			</div>
		</div>
	)
}
