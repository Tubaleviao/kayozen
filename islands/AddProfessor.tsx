import { useState } from "preact/hooks"
import SchoolAddTeacherIllustration from "../components/SchoolProfArt.tsx"
import NewProfessorModal from "./NewProfessorModal.tsx"
import { useTranslationContext } from "./TranslationContext.tsx"
import { School } from "../utils/interfaces.ts"

interface Props{
    school?: School
}

export default function AddProfessor({ school }: Props){
    const [open, setOpen] = useState(false)
    const { t } = useTranslationContext()
    return(
        <>
            <SchoolAddTeacherIllustration 
                addProf={t("index.add_prof")} 
                schoolName={school?.name ?? "undefined"}
                createProfessor={() => setOpen(true)} 
            />
            <NewProfessorModal
                open={open}
                onClose={() => setOpen(false)}
                schoolId={school?.id ?? "undefined"}
            />
        </>
    )
}