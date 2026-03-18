import { DAY_MS } from "../utils/constants.ts"
import { WeekTimelineLecture } from "../utils/interfaces.ts"

interface Props {
	day?: number
	lectures: WeekTimelineLecture[]
}

function getStartOfWeek(dayMs: number) {
	const date = new Date(dayMs)
	const day = date.getDay()
	const diff = day === 0 ? -6 : 1 - day

	date.setHours(0, 0, 0, 0)
	date.setDate(date.getDate() + diff)

	return date.getTime()
}

function isSameDay(a: number, b: number) {
	const dateA = new Date(a)
	const dateB = new Date(b)

	return (
		dateA.getFullYear() === dateB.getFullYear() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getDate() === dateB.getDate()
	)
}

function getLectureColorClass(
	lecture: WeekTimelineLecture,
) {
	if (!lecture.hasTeacher && !lecture.hasStudent) {
		return "bg-white/60"
	}

	if (!lecture.hasTeacher && lecture.hasStudent) {
		return "bg-red-200"
	}

	if (lecture.hasTeacher && !lecture.hasStudent) {
		return "bg-yellow-200"
	}

	return "bg-green-200"
}

export default function WeekTimeline({ lectures }: Props) {
	const referenceDay = lectures[0]?.startTime ?? Date.now()
	const startOfWeek = getStartOfWeek(referenceDay)

	const weekDays = Array.from({ length: 7 }, (_, index) => {
		const dateMs = startOfWeek + index * DAY_MS

		return {
			dateMs,
			lectures: lectures.filter((lecture) =>
				isSameDay(lecture.startTime, dateMs)
			),
		}
	})

	return (
		<div class="grid grid-cols-7 gap-2">
			{weekDays.map((weekDay) => {
				const date = new Date(weekDay.dateMs)

				return (
					<div
						key={weekDay.dateMs}
						class="min-h-28 rounded-lg border border-white/20 bg-black/10 p-2"
					>
						<div class="mb-2 text-xs text-white/70">
							{date.toLocaleDateString("en-US", { weekday: "short" })}
						</div>

						<div class="space-y-1">
							{weekDay.lectures.map((lecture) => (
								<div
									key={lecture.id}
									class={`rounded-md p-2 text-xs text-black ${
										getLectureColorClass(lecture)
									}`}
								>
									<div>
										{new Date(lecture.startTime).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
										{" - "}
										{new Date(lecture.endTime).toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
							))}
						</div>
					</div>
				)
			})}
		</div>
	)
}
