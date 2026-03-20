import { School, SupportedLang } from "@/utils/interfaces.ts"
import WeekTimeline from "../../components/weektimeline/WeekTimeline.tsx"
import ProfessorsModule from "./modules/ProfessorsModule.tsx"
import ClassesModule from "./modules/ClassesModule.tsx"
import LecturesModule from "./modules/LecturesModule.tsx"

interface Props {
	lang: SupportedLang
	school?: School
}

export default function CoordinatorView({ lang, school }: Props) {
	return (
		<section class="w-full max-w-280 mx-auto mt-10 px-1">
			<div class="grid
						grid-cols-1
						lg:grid-cols-3
						gap-6
						min-h-170">
				<div class="lg:col-span-3 flex justify-center">
					<ProfessorsModule
						lang={lang}
						schoolId={school?.id ?? ""}
					/>
				</div>

				<div class="lg:col-span-1 flex justify-center">
					<ClassesModule
						lang={lang}
						schoolId={school?.id ?? ""}
					/>
				</div>

				<div class="
						lg:flex flex-col items-center justify-center
					">
					<div class="text-[110px] md:text-[150px] leading-none text-center">
						🏫
					</div>

					<p class="mt-3 font-semibold text-lg text-center">
						{school?.name}
					</p>
				</div>

				<div class="lg:col-span-1 flex justify-center">
					<LecturesModule
						lang={lang}
						schoolId={school?.id ?? ""}
					/>
				</div>

				<div class="lg:col-span-3 flex justify-center">
					<WeekTimeline schoolId={school?.id} />
				</div>
			</div>
		</section>
	)
}
