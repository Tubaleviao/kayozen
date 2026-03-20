import { useEffect, useState } from "preact/hooks"
import AddProfessorNode from "../../../components/AddProfessorNode.tsx"
import NewLectureModal from "../modals/NewLectureModal.tsx"
import { KayoLecture, SupportedLang } from "@/utils/interfaces.ts"
import { defineTFunction } from "@/utils/i18n/index.ts"

interface Props {
	lang: SupportedLang
	schoolId: string
}

export default function LecturesModule({ lang, schoolId }: Props) {
	const [lectures, setLectures] = useState<KayoLecture[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [lectureModalOpen, setLectureModalOpen] = useState(false)

	const t = defineTFunction(lang)

	useEffect(() => {
		let cancelled = false

		async function loadLecturesModuleData() {
			if (!schoolId) {
				setLectures([])
				setLoading(false)
				return
			}

			try {
				setLoading(true)
				setError(null)

				const [lecturesResponse] = await Promise.all([
					fetch(`/api/schools/${schoolId}/lectures`),
				])

				if (!lecturesResponse.ok) {
					throw new Error("Failed to load lectures module data")
				}

				const lecturesData = await lecturesResponse.json()

				if (!cancelled) {
					setLectures(lecturesData.lectures ?? [])
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
			<div class="text-center">
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
							const start = new Date(lecture.startTime)

							return (
								<div
									key={lecture.id}
									class="min-w-28 px-4 py-3 rounded-xl shadow-md
										bg-light-surface dark:bg-dark-surface text-sm"
								>
									{`${
										start.toLocaleDateString("en-US", { weekday: "short" })
									} - ${start.getHours()}:${start.getMinutes()}`}
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
				onLectureCreated={(newLecture) =>
					setLectures((prev) => [...prev, newLecture])}
			/>
		</>
	)
}
