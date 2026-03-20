import { WeekTimelineLecture } from "@/utils/interfaces.ts"
import WeekTimelineLectureItem from "./Item.tsx"

interface Props {
	day: {
		dateMs: number
		lectures: WeekTimelineLecture[]
	}
	loading: boolean
}

export default function WeekTimelineDayCard({ day, loading }: Props) {
	const date = new Date(day.dateMs)

	return (
		<div class="min-h-40 max-h-40 rounded-lg border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/10 p-2">
			<div class="mb-1 text-xs text-light-text/70 dark:text-dark-text/70">
				{date.toLocaleDateString("en-US", { weekday: "short" })}
			</div>

			<div class="mb-1 text-xs text-light-muted dark:text-dark-muted">
				{date.toLocaleDateString("en-US", {
					month: "2-digit",
					day: "2-digit",
				})}
			</div>

			{loading
				? (
					<div class="space-y-2">
						<div class="h-8 animate-pulse rounded-md bg-black/5 dark:bg-white/10">
						</div>
						<div class="h-8 animate-pulse rounded-md bg-black/5 dark:bg-white/10">
						</div>
					</div>
				)
				: (
					<div class="flex flex-wrap gap-1 max-h-26 overflow-y-auto pr-1 scrollbar-theme">
						{day.lectures.length === 0
							? (
								<div class="rounded-md bg-black/5 dark:bg-white/10 p-2 text-xs text-light-muted/70 dark:text-dark-muted/70">
									-
								</div>
							)
							: day.lectures.map((lecture) => (
								<WeekTimelineLectureItem
									key={lecture.id}
									lecture={lecture}
								/>
							))}
					</div>
				)}
		</div>
	)
}
