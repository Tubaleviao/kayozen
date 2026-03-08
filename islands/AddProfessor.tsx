import { useState } from "preact/hooks"
import SchoolAddTeacherIllustration from "../components/SchoolProfArt.tsx"
import NewProfessorModal from "./NewProfessorModal.tsx"
import { Professor, School } from "../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"
import AddProfessorNode from "../components/AddProfessorNode.tsx"

interface Props {
	school?: School
	lang: SupportedLang
	onProfessorCreated: (p: Professor) => void
}

export default function AddProfessor(
	{ school, lang, onProfessorCreated }: Props,
) {
	const [open, setOpen] = useState(false)
	const t = defineTFunction(lang)
	return (
		<>
			<AddProfessorNode
				label={t("index.add_prof")}
				onClick={() => setOpen(true)}
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
				onProfessorCreated={onProfessorCreated}
			/>
		</>
	)
}
