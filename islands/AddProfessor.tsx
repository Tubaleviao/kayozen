import { useState } from "preact/hooks"
import SchoolAddTeacherIllustration from "../components/SchoolProfArt.tsx"
import NewProfessorModal from "./NewProfessorModal.tsx"
import { School } from "../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"

interface Props {
	school?: School
	lang: SupportedLang
}

export default function AddProfessor({ school, lang }: Props) {
	const [open, setOpen] = useState(false)
	const t = defineTFunction(lang)
	return (
		<>
			<SchoolAddTeacherIllustration
				addProf={t("index.add_prof")}
				schoolName={school?.name ?? "undefined"}
				createProfessor={() => setOpen(true)}
			/>
			<NewProfessorModal
				open={open}
				onClose={(msg) => {
					setOpen(false)
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
			/>
		</>
	)
}
