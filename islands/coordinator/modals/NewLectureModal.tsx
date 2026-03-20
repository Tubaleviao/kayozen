import { useEffect, useState } from "preact/hooks"
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

				const [subjectsResponse] = await Promise.all([
					fetch(`/api/schools/${schoolId}/subjects`),
				])

				if (!subjectsResponse.ok) {
					throw new Error("Failed to load lectures module data")
				}

				const subjectsData = await subjectsResponse.json()

				if (!cancelled) {
					setSubjects(subjectsData.subjects ?? [])
				}
			} catch (_error) {
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

	if (!open) return null

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
					New lecture
				</h2>

				<form class="space-y-4" onSubmit={createLectureCall()}>
					<select
						name="subject"
						required
						class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select subject</option>
						{subjects.map((subject) => (
							<option key={subject.id} value={subject.id}>
								{subject.name}
							</option>
						))}
					</select>

					<input
						name="startTime"
						type="datetime-local"
						required
						class="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<input
						name="endTime"
						type="datetime-local"
						required
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
