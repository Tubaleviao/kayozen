import { useEffect, useMemo, useState } from "preact/hooks"
import { WeekApiResponse, WeekTimelineLecture } from "@/utils/interfaces.ts"
import { DAY_MS } from "@/utils/constants.ts"
import { getStartOfWeek, isSameDay } from "@/utils/pureFunctions.ts"
import WeekTimelineHeader from "./Header.tsx"
import WeekTimelineGrid from "./Grid.tsx"

export interface Props {
	schoolId?: string
}

export default function WeekTimeline({ schoolId }: Props) {
	const [weekStart, setWeekStart] = useState(() => getStartOfWeek(Date.now()))
	const [lectures, setLectures] = useState<WeekTimelineLecture[]>([])
	const [loading, setLoading] = useState(true)
	const [direction, setDirection] = useState<"next" | "prev" | null>(null)
	const [animationClass, setAnimationClass] = useState("")

	useEffect(() => {
		let cancelled = false

		async function loadWeek() {
			if (!schoolId) {
				setLectures([])
				setLoading(false)
				return
			}

			setLoading(true)

			try {
				const url = new URL("/api/lecture", globalThis.location.origin)
				url.searchParams.set("schoolId", schoolId)
				url.searchParams.set("weekStart", String(weekStart))

				const response = await fetch(url.toString())
				const data: WeekApiResponse = await response.json()

				if (!cancelled) {
					setLectures(data.lectures ?? [])

					setAnimationClass(
						direction === "next"
							? "animate-week-swipe-next"
							: direction === "prev"
							? "animate-week-swipe-prev"
							: "",
					)
				}
			} finally {
				if (!cancelled) {
					setLoading(false)
				}
			}
		}

		loadWeek()

		return () => {
			cancelled = true
		}
	}, [schoolId, weekStart])

	const weekDays = useMemo(() => {
		return Array.from({ length: 7 }, (_, index) => {
			const dateMs = weekStart + index * DAY_MS

			return {
				dateMs,
				lectures: lectures.filter((lecture) =>
					isSameDay(lecture.startTime, dateMs)
				),
			}
		})
	}, [lectures, weekStart])

	return (
		<div class="w-full">
			<WeekTimelineHeader
				weekStart={weekStart}
				onPrev={() => {
					setDirection("prev")
					setWeekStart((c) => c - 7 * DAY_MS)
				}}
				onNext={() => {
					setDirection("next")
					setWeekStart((c) => c + 7 * DAY_MS)
				}}
			/>

			<WeekTimelineGrid
				weekDays={weekDays}
				loading={loading}
				animationClass={animationClass}
				onAnimationEnd={() => {
					setAnimationClass("")
					setDirection(null)
				}}
			/>
		</div>
	)
}
