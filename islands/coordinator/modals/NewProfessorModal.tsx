import { createElement } from "preact"
import { defineTFunction } from "@/utils/i18n/index.ts"
import { Professor, SupportedLang } from "@/utils/interfaces.ts"

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
		<div class="fixed inset-0 z-50 flex items-center justify-center p-6">
			{/* Backdrop */}
			<div
				class="absolute inset-0 bg-black/40"
				onClick={() => onClose()}
			/>

			{/* Modal */}
			<div class="relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl
rounded-2xl bg-light-background dark:bg-dark-background
p-6 md:p-8 shadow-xl text-light-text dark:text-dark-text">
				<h2 class="text-lg font-semibold border-b pb-3 mb-4">
					{t("dashboard.modal.new_professor")}
				</h2>

				<form
					class="space-y-4"
					onSubmit={createProfessorCall()}
				>
					<input
						name="name"
						required
						placeholder={t("dashboard.modal.name")}
						class="md:col-span-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<input
						name="email"
						type="email"
						placeholder={t("dashboard.modal.optional_email")}
						class="md:col-span-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<input
						name="subject"
						placeholder={t("dashboard.modal.subject")}
						class="md:col-span-2 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<div class="flex items-center mb-4">
						<input
							name="fictitious"
							type="checkbox"
							class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
							checked
							disabled
						/>
						<label class="select-none ms-2 text-sm font-medium text-heading">
							{t("dashboard.modal.fictitious")}?
						</label>
					</div>

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
