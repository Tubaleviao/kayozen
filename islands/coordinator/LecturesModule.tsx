import { useEffect, useState } from "preact/hooks"
import AddProfessorNode from "../../components/AddProfessorNode.tsx"
import NewLectureModal from "../coordinator/NewLectureModal.tsx"
import { KayoLecture, KayoSubject } from "../../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../../utils/i18n.ts"

interface Props {
	lang: SupportedLang
	schoolId: string
}

export default function LecturesModule({ lang, schoolId }: Props) {
	const [lectures, setLectures] = useState<KayoLecture[]>([])
	const [subjects, setSubjects] = useState<KayoSubject[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [lectureModalOpen, setLectureModalOpen] = useState(false)

	const t = defineTFunction(lang)

	useEffect(() => {
		let cancelled = false

		async function loadLecturesModuleData() {
			if (!schoolId) {
				setLectures([])
				setSubjects([])
				setLoading(false)
				return
			}

			try {
				setLoading(true)
				setError(null)

				const [lecturesResponse, subjectsResponse] = await Promise.all([
					fetch(`/api/schools/${schoolId}/lectures`),
					fetch(`/api/schools/${schoolId}/subjects`),
				])

				if (!lecturesResponse.ok || !subjectsResponse.ok) {
					throw new Error("Failed to load lectures module data")
				}

				const lecturesData = await lecturesResponse.json()
				const subjectsData = await subjectsResponse.json()

				if (!cancelled) {
					setLectures(lecturesData.lectures ?? [])
					setSubjects(subjectsData.subjects ?? [])
				}
			} catch (_error) {
				if (!cancelled) {
					setError(t("school.error_unexpected"))
				}
			} finally {
				if (!cancelled) {
					setLoading(false)
				}
			}
		}

		loadLecturesModuleData()

		return () => {
			cancelled = true
		}
	}, [schoolId, lang])

	return (
		<>
			<div class="
					text-center mb-8
					lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2
				">
				<p class="font-semibold mb-3">Lectures</p>

				<div class="flex flex-wrap justify-center gap-3 pointer-events-auto">
					{loading
						? Array.from({ length: 3 }).map((_, index) => (
							<div
								key={`lecture-skeleton-${index}`}
								class="min-w-28 px-4 py-3 rounded-xl shadow-md animate-pulse
									bg-light-surface dark:bg-dark-surface text-sm h-12"
							/>
						))
						: lectures.map((lecture) => {
							const lectureSubject = subjects.find((s) =>
								s.id === lecture.subject
							)

							return (
								<div
									key={lecture.id}
									class="min-w-28 px-4 py-3 rounded-xl shadow-md
										bg-light-surface dark:bg-dark-surface text-sm"
								>
									{lectureSubject?.name ?? `Subject ${lecture.subject}`}
								</div>
							)
						})}

					<AddProfessorNode
						label="Add lecture"
						onClick={() => {
							setLectureModalOpen(true)
						}}
					/>
				</div>

				{!loading && error && <p class="mt-3 text-sm text-red-500">{error}</p>}
			</div>

			<NewLectureModal
				open={lectureModalOpen}
				onClose={(msg) => {
					setLectureModalOpen(false)

					if (!msg) return

					if (msg.ok) {
						globalThis.toast?.(msg.text || "Lecture created")
					} else {
						globalThis.toast?.(
							msg.text || t("school.error_unexpected"),
							"error",
						)
					}
				}}
				lang={lang}
				schoolId={schoolId}
				subjects={subjects}
				onLectureCreated={(newLecture) =>
					setLectures((prev) => [...prev, newLecture])}
			/>
		</>
	)
}
