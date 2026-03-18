import { useEffect, useState } from "preact/hooks"
import { School } from "../utils/interfaces.ts"
import AddProfessorNode from "../components/AddProfessorNode.tsx"
import NewProfessorModal from "./NewProfessorModal.tsx"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"
import WeekTimeline from "../components/WeekTimeline.tsx"

interface Props {
	lang: SupportedLang
	school?: School
}

export default function CoordinatorView(
	{ lang, school }: Props,
) {
	const [professors, setProfessors] = useState(school?.professors || [])
	const [professorModalOpen, setProfessorModalOpen] = useState(false)

	useEffect(() => {
		setProfessors(school?.professors || [])
	}, [school])

	const t = defineTFunction(lang)

	return (
		<section class="relative w-full max-w-250 mx-auto mt-20 px-6 min-h-130">
			{/* PROFESSORS */}
			<div class="
					flex flex-col items-center gap-3 mb-10
					lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2
					lg:max-w-[80%]
				">
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
			<div class="
                flex flex-col items-center mb-10 pointer-events-none
                lg:absolute lg:top-1/2 lg:left-1/2
                lg:-translate-x-1/2 lg:-translate-y-1/2
            ">
				<div class="text-[110px] md:text-[150px] leading-none">🏫</div>

				<p class="mt-3 font-semibold text-lg text-center">
					{school?.name}
				</p>
			</div>

			{/* CLASSES */}
			<div class="
                text-center mb-8 pointer-events-none
                lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2
            ">
				Classes
			</div>

			{/* SCHEDULE */}
			<div class="
                text-center mb-8 pointer-events-none
                lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2
            ">
				Schedule
			</div>

			{/* WEEK TIMELINE */}
			<div class="
                text-center pointer-events-none
                lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2
            ">
				Week Timeline
				<WeekTimeline lectures={[]} />
			</div>

			{/* MODAL */}
			<NewProfessorModal
				open={professorModalOpen}
				onClose={(msg) => {
					setProfessorModalOpen(false)
					if (msg?.ok) {
						globalThis.toast?.(
							msg.text ?? t("school.professor_created"),
						)
					} else {globalThis.toast?.(
							msg?.text ?? t("school.error_unexpected"),
							"error",
						)}
				}}
				schoolId={school?.id ?? "undefined"}
				lang={lang}
				onProfessorCreated={(prof) => setProfessors((prev) => [...prev, prof])}
			/>
		</section>
	)
}
