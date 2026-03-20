import { WeekTimelineLecture } from "./interfaces.ts"

export function getCookieValue(
	cookie: string | null,
	key: string,
): string | undefined {
	return cookie?.match(new RegExp(`${key}=([^;]+)`))?.[1]
}

export function getStartOfWeek(dayMs: number) {
	const date = new Date(dayMs)
	const day = date.getDay()
	const diff = day === 0 ? -6 : 1 - day

	date.setHours(0, 0, 0, 0)
	date.setDate(date.getDate() + diff)

	return date.getTime()
}

export function isSameDay(a: number, b: number) {
	const dateA = new Date(a)
	const dateB = new Date(b)

	return (
		dateA.getFullYear() === dateB.getFullYear() &&
		dateA.getMonth() === dateB.getMonth() &&
		dateA.getDate() === dateB.getDate()
	)
}

export function getLectureColorClass(lecture: WeekTimelineLecture) {
	if (!lecture.hasTeacher && !lecture.hasStudent) {
		return "bg-white/30"
	}

	if (!lecture.hasTeacher && lecture.hasStudent) {
		return "bg-red-200"
	}

	if (lecture.hasTeacher && !lecture.hasStudent) {
		return "bg-yellow-200"
	}

	return "bg-green-200"
}
