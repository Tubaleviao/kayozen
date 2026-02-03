// islands/CreateSchool.tsx
import { useState } from "preact/hooks"
import { useTranslationContext } from "./TranslationContext.tsx"
import { useToast } from "./ToastProvider.tsx"
import { DbUser } from "../utils/interfaces.ts"
import SchoolIllustration from "./SchoolIllustration.tsx"

interface CreateSchoolProps {
	user?: DbUser | null
}

export default function CreateSchool({ user }: CreateSchoolProps) {
	const { t } = useTranslationContext()
	const toast = useToast()

	const [loading, setLoading] = useState(false)
	const [name, setName] = useState(t("school.default_name"))
	const [cnpj, setCnpj] = useState("")

	async function handleCreate() {
		if (!name.trim()) {
			toast.error(t("school.error_name_required"))
			return
		}

		try {
			setLoading(true)

			const res = await fetch("/api/schools", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name,
					cnpj: cnpj || null,
					userId: user?.id,
				}),
			})

			const data = await res.json().catch(() => ({}))

			if (!res.ok) {
				throw new Error(data?.error ?? t("school.error_create"))
			}

			toast.success(t("school.success_create"))
			globalThis.location.href = `/schools/${data.id}`
		} catch (err) {
			toast.error(
				err instanceof Error ? err.message : t("school.error_unexpected"),
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class="flex flex-col items-center gap-6 max-w-sm mx-auto">
			{/* School name */}
			<div class="w-full">
				<label class="block text-sm mb-1">
					{t("school.field_name")}
				</label>
				<input
					type="text"
					value={name}
					onInput={(e) => setName((e.target as HTMLInputElement).value)}
					disabled={loading}
					class="w-full px-3 py-2 rounded border
					bg-kayozen-light-surface dark:bg-kayozen-dark-surface
					border-kayozen-light-muted dark:border-kayozen-dark-muted"
				/>
			</div>

			{/* CNPJ */}
			<div class="w-full">
				<label class="block text-sm mb-1">
					{t("school.field_cnpj")}
				</label>
				<input
					type="text"
					value={cnpj}
					onInput={(e) => setCnpj((e.target as HTMLInputElement).value)}
					disabled={loading}
					placeholder="00.000.000/0000-00"
					class="w-full px-3 py-2 rounded border
					bg-kayozen-light-surface dark:bg-kayozen-dark-surface
					border-kayozen-light-muted dark:border-kayozen-dark-muted"
				/>
			</div>

			{/* CTA Illustration */}
			<button
				type="button"
				onClick={handleCreate}
				disabled={loading}
				class="group relative"
				aria-label={t("school.aria_label")}
				title={t("school.tooltip")}
			>
				<SchoolIllustration
					label={t("school.label")}
					loading={loading}
				/>

				{!loading && (
					<span class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm
					text-kayozen-light-muted dark:text-kayozen-dark-muted">
						{t("school.click_hint")}
					</span>
				)}
			</button>

			{loading && (
				<p class="text-sm text-kayozen-light-muted dark:text-kayozen-dark-muted">
					{t("school.creating")}
				</p>
			)}
		</div>
	)
}
