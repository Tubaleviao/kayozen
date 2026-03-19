import { defineTFunction, SupportedLang } from "../../utils/i18n.ts"
import { KayoClass } from "../../utils/interfaces.ts"

interface NewClassModalProps {
	open: boolean
	onClose: (msg?: { ok: boolean; text: string }) => void
	lang: SupportedLang
	onClassCreated: (newClass: KayoClass) => void
}

export default function NewClassModal(
	{ open, onClose, lang, onClassCreated }: NewClassModalProps,
) {
	if (!open) return null
	const t = defineTFunction(lang)

	const createClassCall = () => async (e: Event) => {
		e.preventDefault()

		const form = e.currentTarget as HTMLFormElement
		const data = new FormData(form)
		const msg = { ok: false, text: "" }

		const newClass = {
			name: data.get("name"),
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
			console.error(e)
			msg.text = e.message
		} finally {
			onClose(msg)
		}
	}

	return (
		<div class="fixed inset-0 z-50 flex items-center justify-center p-6">
			<div class="absolute inset-0 bg-black/40" onClick={() => onClose()} />

			<div class="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl
					rounded-2xl bg-light-background dark:bg-dark-background
					p-6 md:p-8 shadow-xl text-light-text dark:text-dark-text">
				<h2 class="text-lg font-semibold border-b pb-3 mb-4">
					New class
				</h2>

				<form class="space-y-4" onSubmit={createClassCall()}>
					<input
						name="name"
						required
						placeholder={t("dashboard.modal.name")}
						class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<div class="flex justify-end gap-2 pt-2">
						<button
							type="button"
							onClick={() => onClose()}
							class="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
						>
							{t("dashboard.modal.cancel")}
						</button>

						<button
							type="submit"
							class="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
						>
							{t("dashboard.modal.create")}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
