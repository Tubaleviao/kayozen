import { useState } from "preact/hooks"
import SchoolAddTeacherIllustration from "../components/SchoolProfArt.tsx"
import NewProfessorModal from "./NewProfessorModal.tsx"
import { useTranslationContext } from "./TranslationContext.tsx"

interface Props{
    schoolName: string
}

export default function AddProfessor({ schoolName }: Props){
    const [open, setOpen] = useState(false)
    const { t } = useTranslationContext()
    return(
        <>
            <SchoolAddTeacherIllustration 
                addProf={t("index.add_prof")} 
                schoolName={schoolName}
                createProfessor={() => setOpen(true)} 
            />
            <NewProfessorModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    )
}