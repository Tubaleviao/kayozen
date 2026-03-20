import { createElement } from "preact"
import { defineTFunction } from "@/utils/i18n/index.ts"
import { Professor, SupportedLang } from "@/utils/interfaces.ts"
import ModalLayout from "../../../components/ModalLayout.tsx"

interface Props {
	open: boolean
	onClose: (msg?: { ok: boolean; text: string }) => void
	schoolId: string
	lang: SupportedLang
	onProfessorCreated: (p: Professor) => void
}

export default function NewProfessorModal(
	{ open, onClose, schoolId, lang, onProfessorCreated }: Props,
) {
	if (!open) return null
	const t = defineTFunction(lang)

	const createProfessorCall =
		() => async (e: createElement.JSX.TargetedSubmitEvent<HTMLFormElement>) => {
			e.preventDefault()

			const form = e.currentTarget
			const data = new FormData(form)
			const msg = { ok: false, text: "" }

			const professor = {
				name: data.get("name"),
				email: data.get("email"),
				subject: data.get("subject"),
				fictitious: data.get("fictitious") ?? "on",
				schoolId,
			}

			try {
				const res = await fetch("/api/professor", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(professor),
				})

				if (!res.ok) {
					const data = await res.json().catch(() => ({}))
					throw new Error(data?.error ?? t("school.error_create"))
				}
				const data = await res.json()

				msg.ok = data.success
				msg.text = data.error

				onProfessorCreated({
					name: professor.name?.toString()!,
					email: professor.email?.toString(),
					fictitious: professor.fictitious.toString() ? true : false,
				})
			} catch (e: any) {
				console.error(e)
				msg.text = e.message
			} finally {
				onClose(msg)
			}
		}

	return (
		<ModalLayout
			open={open}
			onClose={() => onClose()}
			title={t("dashboard.modal.new_professor")}
		>
			<form class="space-y-6" onSubmit={createProfessorCall()}>
				<input
					name="name"
					required
					placeholder={t("dashboard.modal.name")}
					class="
						w-full rounded-xl px-3 py-2
						bg-light-surface dark:bg-dark-surface
						text-light-text dark:text-dark-text
						border border-black/10 dark:border-white/10
						focus:outline-none focus:ring-2 focus:ring-blue-500
					"
				/>

				<input
					name="email"
					type="email"
					placeholder={t("dashboard.modal.optional_email")}
					class="
						w-full rounded-xl px-3 py-2
						bg-light-surface dark:bg-dark-surface
						text-light-text dark:text-dark-text
						border border-black/10 dark:border-white/10
						focus:outline-none focus:ring-2 focus:ring-blue-500
					"
				/>

				<input
					name="subject"
					placeholder={t("dashboard.modal.subject")}
					class="
						w-full rounded-xl px-3 py-2
						bg-light-surface dark:bg-dark-surface
						text-light-text dark:text-dark-text
						border border-black/10 dark:border-white/10
						focus:outline-none focus:ring-2 focus:ring-blue-500
					"
				/>

				<div class="flex items-center gap-2">
					<input
						name="fictitious"
						type="checkbox"
						class="
							w-4 h-4 rounded border
							border-black/20 dark:border-white/20
							bg-light-surface dark:bg-dark-surface
						"
						checked
						disabled
					/>
					<label class="text-sm text-light-muted dark:text-dark-muted">
						{t("dashboard.modal.fictitious")}?
					</label>
				</div>

				<div class="flex justify-end gap-2 pt-2">
					<button
						type="button"
						onClick={() => onClose()}
						class="
							rounded-lg px-4 py-2
							text-light-muted dark:text-dark-muted
							hover:bg-black/5 dark:hover:bg-white/5
						"
					>
						{t("dashboard.modal.cancel")}
					</button>

					<button
						type="submit"
						class="
							rounded-lg px-4 py-2
							bg-blue-600 text-white
							hover:bg-blue-700
							shadow-sm
						"
					>
						{t("dashboard.modal.create")}
					</button>
				</div>
			</form>
		</ModalLayout>
	)
}
