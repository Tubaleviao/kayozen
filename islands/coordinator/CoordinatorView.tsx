import { useEffect, useState } from "preact/hooks"
import { KayoClass, KayoLecture, KayoSubject, School } from "../../utils/interfaces.ts"
import AddProfessorNode from "../../components/AddProfessorNode.tsx"
import NewProfessorModal from "../coordinator/NewProfessorModal.tsx"
import { defineTFunction, SupportedLang } from "../../utils/i18n.ts"
import WeekTimeline from "../../components/WeekTimeline.tsx"
import NewClassModal from "../coordinator/NewClassModal.tsx"
import NewLectureModal from "../coordinator/NewLectureModal.tsx"

interface Props {
	lang: SupportedLang
	school?: School
	classes?: KayoClass[]
	subjects?: KayoSubject[]
	lectures?: KayoLecture[]
}

export default function CoordinatorView(
	{ lang, school, classes = [], subjects = [], lectures = [] }: Props,
) {
	const [professors, setProfessors] = useState(school?.professors || [])
	const [localClasses, setLocalClasses] = useState(classes)
	const [localLectures, setLocalLectures] = useState(lectures)

	const [professorModalOpen, setProfessorModalOpen] = useState(false)
	const [classModalOpen, setClassModalOpen] = useState(false)
	const [lectureModalOpen, setLectureModalOpen] = useState(false)

	useEffect(() => {
		setProfessors(school?.professors || [])
	}, [school])

	useEffect(() => {
		setLocalClasses(classes)
	}, [classes])

	useEffect(() => {
		setLocalLectures(lectures)
	}, [lectures])

	const t = defineTFunction(lang)

	return (
		<section class="relative w-full max-w-250 mx-auto mt-20 px-6 min-h-130">
			{/* PROFESSORS */}
			<div
				class="
					flex flex-col items-center gap-3 mb-10
					lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2
					lg:max-w-[80%]
				"
			>
				<p class="text-sm font-semibold text-center">
					Professors
				</p>

				<div class="flex flex-wrap justify-center gap-3">
					{professors?.map((p) => (
						<div
							key={p.name + "-p"}
							class="w-16 h-16 md:w-18 md:h-18
								rounded-full flex items-center justify-center
								bg-light-surface dark:bg-dark-surface
								shadow-md text-sm"
						>
							{p.name.split(" ")[0]}
						</div>
					))}

					<AddProfessorNode
						label={t("index.add_prof")}
						onClick={() => {
							setProfessorModalOpen(true)
						}}
					/>
				</div>
			</div>

			{/* CENTER SCHOOL */}
			<div
				class="
					flex flex-col items-center mb-10 pointer-events-none
					lg:absolute lg:top-1/2 lg:left-1/2
					lg:-translate-x-1/2 lg:-translate-y-1/2
				"
			>
				<div class="text-[110px] md:text-[150px] leading-none">🏫</div>

				<p class="mt-3 font-semibold text-lg text-center">
					{school?.name}
				</p>
			</div>

			{/* CLASSES */}
			<div
				class="
					text-center mb-8
					lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2
				"
			>
				<p class="font-semibold mb-3">Classes</p>

				<div class="flex flex-wrap justify-center gap-3 pointer-events-auto">
					{localClasses.map((c) => (
						<div
							key={c.id}
							class="min-w-20 px-4 py-3 rounded-xl shadow-md
								bg-light-surface dark:bg-dark-surface text-sm"
						>
							{c.name}
						</div>
					))}

					<AddProfessorNode
						label="Add class"
						onClick={() => {
							setClassModalOpen(true)
						}}
					/>
				</div>
			</div>

			{/* LECTURES */}
			<div
				class="
					text-center mb-8
					lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2
				"
			>
				<p class="font-semibold mb-3">Lectures</p>

				<div class="flex flex-wrap justify-center gap-3 pointer-events-auto">
					{localLectures.map((lecture) => {
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
			</div>

			{/* WEEK TIMELINE */}
			<div
				class="
					text-center
					lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2
				"
			>
				<p class="mb-3">Week Timeline</p>
				<WeekTimeline lectures={[]} />
			</div>

			{/* PROFESSOR MODAL */}
			<NewProfessorModal
				open={professorModalOpen}
				onClose={(msg) => {
					setProfessorModalOpen(false)

					if (!msg) return

					if (msg.ok) {
						globalThis.toast?.(
							msg.text ?? t("school.professor_created"),
						)
					} else {
						globalThis.toast?.(
							msg.text ?? t("school.error_unexpected"),
							"error",
						)
					}
				}}
				schoolId={school?.id ?? ""}
				lang={lang}
				onProfessorCreated={(prof) =>
					setProfessors((prev) => [...prev, prof])}
			/>

			{/* CLASS MODAL */}
			<NewClassModal
				open={classModalOpen}
				onClose={(msg) => {
					setClassModalOpen(false)

					if (!msg) return

					if (msg.ok) {
						globalThis.toast?.(msg.text || "Class created")
					} else {
						globalThis.toast?.(
							msg.text || t("school.error_unexpected"),
							"error",
						)
					}
				}}
				lang={lang}
				onClassCreated={(newClass) =>
					setLocalClasses((prev) => [...prev, newClass])}
			/>

			{/* LECTURE MODAL */}
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
				schoolId={school?.id ?? ""}
				subjects={subjects}
				onLectureCreated={(newLecture) =>
					setLocalLectures((prev) => [...prev, newLecture])}
			/>
		</section>
	)
}
