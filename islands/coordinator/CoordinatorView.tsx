import { School } from "../../utils/interfaces.ts"
import { SupportedLang } from "../../utils/i18n.ts"
import WeekTimeline from "../../components/WeekTimeline.tsx"
import ProfessorsModule from "./modules/ProfessorsModule.tsx"
import ClassesModule from "./modules/ClassesModule.tsx"
import LecturesModule from "./modules/LecturesModule.tsx"

interface Props {
	lang: SupportedLang
	school?: School
}

export default function CoordinatorView({ lang, school }: Props) {
	return (
		<section class="relative w-full max-w-250 mx-auto mt-20 px-6 min-h-130">
			<ProfessorsModule
				lang={lang}
				schoolId={school?.id ?? ""}
			/>

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

			<ClassesModule
				lang={lang}
				schoolId={school?.id ?? ""}
			/>

			<LecturesModule
				lang={lang}
				schoolId={school?.id ?? ""}
			/>

			<div class="
					text-center
					lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2
				">
				<p class="mb-3">Week Timeline</p>
				<WeekTimeline lectures={[]} />
			</div>
		</section>
	)
}
