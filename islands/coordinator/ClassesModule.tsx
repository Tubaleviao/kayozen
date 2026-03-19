import { useEffect, useState } from "preact/hooks"
import AddProfessorNode from "../../components/AddProfessorNode.tsx"
import NewClassModal from "../coordinator/NewClassModal.tsx"
import { KayoClass } from "../../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../../utils/i18n.ts"

interface Props {
	lang: SupportedLang
	schoolId: string
}

export default function ClassesModule({ lang, schoolId }: Props) {
	const [classes, setClasses] = useState<KayoClass[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [classModalOpen, setClassModalOpen] = useState(false)

	const t = defineTFunction(lang)

	useEffect(() => {
		let cancelled = false

		async function loadClasses() {
			if (!schoolId) {
				setClasses([])
				setLoading(false)
				return
			}

			try {
				setLoading(true)
				setError(null)

				const response = await fetch(`/api/schools/${schoolId}/classes`)

				if (!response.ok) {
					throw new Error("Failed to load classes")
				}

				const data = await response.json()

				if (!cancelled) {
					setClasses(data.classes ?? [])
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

		loadClasses()

		return () => {
			cancelled = true
		}
	}, [schoolId, lang])

	return (
		<>
			<div class="
					text-center mb-8
					lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2
				">
				<p class="font-semibold mb-3">Classes</p>

				<div class="flex flex-wrap justify-center gap-3 pointer-events-auto">
					{loading
						? Array.from({ length: 3 }).map((_, index) => (
							<div
								key={`class-skeleton-${index}`}
								class="min-w-20 px-4 py-3 rounded-xl shadow-md animate-pulse
									bg-light-surface dark:bg-dark-surface text-sm h-12"
							/>
						))
						: classes.map((c) => (
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

				{!loading && error && <p class="mt-3 text-sm text-red-500">{error}</p>}
			</div>

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
				onClassCreated={(newClass) => setClasses((prev) => [...prev, newClass])}
			/>
		</>
	)
}
