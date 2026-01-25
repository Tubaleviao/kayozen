import { useState } from "preact/hooks"
import SchoolAddTeacherIllustration from "../components/SchoolProfArt.tsx"
import NewProfessorModal from "./NewProfessorModal.tsx"
import { useTranslationContext } from "./TranslationContext.tsx"
import { School } from "../utils/interfaces.ts"
import { useToast } from "./ToastProvider.tsx"

interface Props {
	school?: School
}

export default function AddProfessor({ school }: Props) {
	const [open, setOpen] = useState(false)
	const { t } = useTranslationContext()
	const toast = useToast()
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
					if (msg?.ok) toast.success(msg.text ?? "Success!")
					else toast.error(msg?.text ?? t("school.error_unexpected"))
				}}
				schoolId={school?.id ?? "undefined"}
			/>
		</>
	)
}
