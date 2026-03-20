import { useEffect, useState } from "preact/hooks"
import ModalLayout from "@/components/ModalLayout.tsx"
import { defineTFunction } from "@/utils/i18n/index.ts"
import { KayoLecture, KayoSubject, SupportedLang } from "@/utils/interfaces.ts"

interface NewLectureModalProps {
	open: boolean
	onClose: (msg?: { ok: boolean; text: string }) => void
	schoolId: string
	lang: SupportedLang
	onLectureCreated: (lecture: KayoLecture) => void
}

export default function NewLectureModal(
	{ open, onClose, schoolId, lang, onLectureCreated }: NewLectureModalProps,
) {
	const t = defineTFunction(lang)

	const [subjects, setSubjects] = useState<KayoSubject[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		let cancelled = false

		async function loadLecturesModuleData() {
			try {
				setLoading(true)

				const res = await fetch(`/api/schools/${schoolId}/subjects`)
				if (!res.ok) throw new Error()

				const data = await res.json()

				if (!cancelled) {
					setSubjects(data.subjects ?? [])
				}
			} catch {
				if (!cancelled) {
					globalThis.toast?.(t("school.error_unexpected"), "error")
				}
			} finally {
				setLoading(false)
			}
		}

		loadLecturesModuleData()
		return () => {
			cancelled = true
		}
	}, [open])

	const createLectureCall = () => async (e: Event) => {
		e.preventDefault()

		const form = e.currentTarget as HTMLFormElement
		const data = new FormData(form)
		const msg = { ok: false, text: "" }

		const newLecture = {
			subject: Number(data.get("subject")),
			school: schoolId,
			startTime: data.get("startTime"),
			endTime: data.get("endTime"),
		}

		try {
			const res = await fetch("/api/lecture", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newLecture),
			})

			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data?.error ?? "Error creating lecture")
			}

			const data = await res.json()

			msg.ok = data.success
			msg.text = data.error ?? "Lecture created"

			onLectureCreated({
				id: data.id,
				subject: newLecture.subject,
				school: newLecture.school,
				startTime: newLecture.startTime?.toString() ?? "",
				endTime: newLecture.endTime?.toString() ?? "",
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
			title="New lecture"
		>
			<form class="space-y-6" onSubmit={createLectureCall()}>
				{/* Subjects */}
				<div class="space-y-2">
					<label class="text-sm font-medium text-light-muted dark:text-dark-muted">
						Pick the subject
					</label>

					<div class="flex flex-wrap gap-2 p-3 rounded-xl bg-light-surface/50 dark:bg-dark-surface/50">
						{subjects.map((subject) => (
							<label
								key={subject.id}
								class="
									px-3 py-1.5 rounded-full text-sm cursor-pointer
									border border-black/10 dark:border-white/10
									bg-light-surface dark:bg-dark-surface
									text-light-text dark:text-dark-text

									hover:bg-black/5 dark:hover:bg-white/5

									has-checked:bg-blue-600
									has-checked:text-white
									has-checked:border-transparent
									has-checked:shadow-sm
								"
							>
								<input
									type="radio"
									name="subject"
									value={subject.id}
									class="hidden"
									required
								/>
								{subject.name}
							</label>
						))}
					</div>
				</div>

				{/* Time */}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
					<input
						name="startTime"
						type="datetime-local"
						required
						class="
							w-full rounded-xl px-3 py-2
							bg-light-surface dark:bg-dark-surface
							text-light-text dark:text-dark-text
							border border-black/10 dark:border-white/10
							focus:outline-none focus:ring-2 focus:ring-blue-500
						"
					/>

					<input
						name="endTime"
						type="datetime-local"
						required
						class="
							w-full rounded-xl px-3 py-2
							bg-light-surface dark:bg-dark-surface
							text-light-text dark:text-dark-text
							border border-black/10 dark:border-white/10
							focus:outline-none focus:ring-2 focus:ring-blue-500
						"
					/>
				</div>

				{/* Actions */}
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
