import ModalLayout from "@/components/ModalLayout.tsx"
import { defineTFunction } from "@/utils/i18n/index.ts"
import { KayoClass, SupportedLang } from "@/utils/interfaces.ts"

interface NewClassModalProps {
	open: boolean
	onClose: (msg?: { ok: boolean; text: string }) => void
	lang: SupportedLang
	onClassCreated: (newClass: KayoClass) => void
	schoolId: string
}

export default function NewClassModal(
	{ open, onClose, lang, onClassCreated, schoolId }: NewClassModalProps,
) {
	const t = defineTFunction(lang)

	const createClassCall = () => async (e: Event) => {
		e.preventDefault()

		const form = e.currentTarget as HTMLFormElement
		const data = new FormData(form)
		const msg = { ok: false, text: "" }

		const newClass = {
			name: data.get("name"),
			schoolId,
		}

		try {
			const res = await fetch("/api/class", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newClass),
			})

			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data?.error ?? "Error creating class")
			}

			const data = await res.json()

			msg.ok = data.success
			msg.text = data.error ?? "Class created"

			onClassCreated({
				id: data.id,
				name: newClass.name?.toString() ?? "",
			})
		} catch (e: any) {
			msg.text = e.message
		} finally {
			onClose(msg)
		}
	}

	return (
		<ModalLayout
			open={open}
			onClose={() => onClose()}
			title="New class"
		>
			<form class="space-y-6" onSubmit={createClassCall()}>
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
