import { WeekTimelineLecture } from "@/utils/interfaces.ts"
import { getLectureColorClass } from "@/utils/pureFunctions.ts"

interface Props {
	lecture: WeekTimelineLecture
}

export default function WeekTimelineLectureItem({ lecture }: Props) {
	const start = new Date(lecture.startTime)
	return (
		<div
			class={`rounded-md w-12 p-2 text-xs text-light-text dark:text-dark-text ${
				getLectureColorClass(lecture)
			}`}
		>
			{`${start.getHours()}:${start.getMinutes()}`}
		</div>
	)
}
