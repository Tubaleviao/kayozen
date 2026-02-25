// islands/CreateSchool.tsx
import { useEffect, useState } from "preact/hooks"
import { KayozenState } from "../utils/interfaces.ts"
import SchoolIllustration from "./SchoolIllustration.tsx"
import { defineTFunction } from "../utils/i18n.ts"

interface CreateSchoolProps {
	state: KayozenState
}

export default function CreateSchool({ state }: CreateSchoolProps) {
	const t = defineTFunction(state.lang)

	const [loading, setLoading] = useState(false)
	const [name, setName] = useState("")
	const [cnpj, setCnpj] = useState("")

	useEffect(() => {
		setName((prev) => prev || t("school.default_name"))
	}, [t])

	async function handleCreate() {
		if (loading) return
		if (!name.trim()) {
			globalThis.toast?.(t("school.error_name_required"), "error")
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
					userId: state.dbUser?.id,
				}),
			})

			const data = await res.json().catch(() => ({}))

			if (!res.ok) {
				throw new Error(data?.error ?? t("school.error_create"))
			}

			globalThis.toast?.(t("school.success_create"))
			globalThis.location.href = `/schools/${data.id}`
		} catch (err) {
			globalThis.toast?.(
				err instanceof Error ? err.message : t("school.error_unexpected"),
				"error",
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
					bg-light-surface dark:bg-dark-surface
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
					bg-light-surface dark:bg-dark-surface
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
					text-light-muted dark:text-dark-muted">
						{t("school.click_hint")}
					</span>
				)}
			</button>

			{loading && (
				<p class="text-sm text-light-muted dark:text-dark-muted">
					{t("school.creating")}
				</p>
			)}
		</div>
	)
}
