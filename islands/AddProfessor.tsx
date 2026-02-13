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
	const toast = {
		error: (msg: string) => console.log(msg),
		success: (msg: string) => console.log(msg),
	}
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
					if (msg?.ok) toast.success(msg.text ?? t("school.professor_created"))
					else toast.error(msg?.text ?? t("school.error_unexpected"))
				}}
				schoolId={school?.id ?? "undefined"}
				lang={lang}
			/>
		</>
	)
}
