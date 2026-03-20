import WeekTimelineDayCard from "./DayCard.tsx"

interface Day {
	dateMs: number
	lectures: any[]
}

interface Props {
	weekDays: Day[]
	loading: boolean
	animationClass: string
	onAnimationEnd: () => void
}

export default function WeekTimelineGrid(
	{ weekDays, loading, animationClass, onAnimationEnd }: Props,
) {
	return (
		<div
			class={animationClass}
			onAnimationEnd={onAnimationEnd}
		>
			<div class="grid grid-cols-7 gap-2">
				{weekDays.map((day) => (
					<WeekTimelineDayCard
						key={day.dateMs}
						day={day}
						loading={loading}
					/>
				))}
			</div>
		</div>
	)
}
