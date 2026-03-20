import { DAY_MS } from "@/utils/constants.ts"

interface Props {
	weekStart: number
	onPrev: () => void
	onNext: () => void
}

export default function WeekTimelineHeader(
	{ weekStart, onPrev, onNext }: Props,
) {
	return (
		<div class="mb-3 flex items-center justify-between gap-2">
			<button
				type="button"
				class="rounded-lg border border-black/10 dark:border-white/20 px-3 py-1 text-sm"
				onClick={onPrev}
			>
				Prev
			</button>

			<div class="text-sm text-light-text dark:text-dark-text">
				{new Date(weekStart).toLocaleDateString("en-US")}
				{" - "}
				{new Date(weekStart + 6 * DAY_MS).toLocaleDateString("en-US")}
			</div>

			<button
				type="button"
				class="rounded-lg border border-black/10 dark:border-white/20 px-3 py-1 text-sm"
				onClick={onNext}
			>
				Next
			</button>
		</div>
	)
}
