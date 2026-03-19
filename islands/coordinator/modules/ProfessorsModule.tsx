import { useEffect, useState } from "preact/hooks"
import AddProfessorNode from "../../../components/AddProfessorNode.tsx"
import NewProfessorModal from "../modals/NewProfessorModal.tsx"
import { defineTFunction, SupportedLang } from "../../../utils/i18n.ts"
import { Professor } from "../../../utils/interfaces.ts"

interface Props {
	lang: SupportedLang
	schoolId: string
}

export default function ProfessorsModule({ lang, schoolId }: Props) {
	const [professors, setProfessors] = useState<Professor[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [professorModalOpen, setProfessorModalOpen] = useState(false)

	const t = defineTFunction(lang)

	useEffect(() => {
		let cancelled = false

		async function loadProfessors() {
			if (!schoolId) {
				setProfessors([])
				setLoading(false)
				return
			}

			try {
				setLoading(true)
				setError(null)

				const response = await fetch(`/api/schools/${schoolId}/professors`)

				if (!response.ok) {
					throw new Error("Failed to load professors")
				}

				const data = await response.json()

				if (!cancelled) {
					setProfessors(data.professors ?? [])
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

		loadProfessors()

		return () => {
			cancelled = true
		}
	}, [schoolId, lang])

	return (
		<>
			<div class="
					flex flex-col items-center gap-3 mb-10
					lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2
					lg:max-w-[80%]
				">
				<p class="text-sm font-semibold text-center">
					Professors
				</p>

				<div class="flex flex-wrap justify-center gap-3">
					{loading
						? Array.from({ length: 3 }).map((_, index) => (
							<div
								key={`prof-skeleton-${index}`}
								class="w-16 h-16 md:w-18 md:h-18 rounded-full animate-pulse
									bg-light-surface dark:bg-dark-surface shadow-md"
							/>
						))
						: professors.map((p) => (
							<div
								key={p.name}
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

				{!loading && error && <p class="text-sm text-red-500">{error}</p>}
			</div>

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
				schoolId={schoolId}
				lang={lang}
				onProfessorCreated={(prof) => setProfessors((prev) => [...prev, prof])}
			/>
		</>
	)
}
