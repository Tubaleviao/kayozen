import { eq } from "drizzle-orm"
import { db } from "./index.ts"
import { lecture } from "./schema/lecture.ts"

export async function getSchoolLectures(schoolId: string) {
	const lectures = await db
		.select({
			id: lecture.id,
			subject: lecture.subject,
			startTime: lecture.startTime,
			endTime: lecture.endTime,
		})
		.from(lecture)
		.where(eq(lecture.school, schoolId))
	return lectures
}
