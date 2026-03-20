import { Context } from "fresh"
import { KayozenState } from "@/utils/interfaces.ts"
import { db } from "@/utils/db/index.ts"
import { lecture } from "@/utils/db/schema/lecture.ts"
import { ValidationError } from "@/utils/errors.ts"
import { DAY_MS } from "@/utils/constants.ts"
import { lectureEmployee } from "@/utils/db/schema/lecture-employee.ts"
import { studentLecture } from "@/utils/db/schema/student-lecture.ts"
import { and, eq, gte, lt, sql } from "drizzle-orm"

export const handler = {
	async GET(ctx: Context<KayozenState>): Promise<Response> {
		const url = new URL(ctx.req.url)
		const schoolId = url.searchParams.get("schoolId")?.toString().trim()
		const weekStartRaw = url.searchParams.get("weekStart")?.toString()

		if (!schoolId) {
			throw new ValidationError("School is required", {
				field: "schoolId",
			})
		}

		if (!weekStartRaw) {
			throw new ValidationError("Week start is required", {
				field: "weekStart",
			})
		}

		const weekStart = Number(weekStartRaw)

		if (Number.isNaN(weekStart)) {
			throw new ValidationError("Invalid week start", {
				field: "weekStart",
				value: weekStartRaw,
			})
		}

		const weekEnd = weekStart + 7 * DAY_MS

		const result = await db
			.select({
				id: lecture.id,
				startTime: lecture.startTime,
				endTime: lecture.endTime,
				hasTeacher: sql<boolean>`exists (
					select 1
					from ${lectureEmployee}
					where ${lectureEmployee.lecture} = ${lecture.id}
				)`,
				hasStudent: sql<boolean>`exists (
					select 1
					from ${studentLecture}
					where ${studentLecture.lecture} = ${lecture.id}
				)`,
			})
			.from(lecture)
			.where(
				and(
					eq(lecture.school, schoolId),
					gte(lecture.startTime, new Date(weekStart)),
					lt(lecture.startTime, new Date(weekEnd)),
				),
			)
			.orderBy(lecture.startTime)

		return Response.json({
			success: true,
			lectures: result.map((item) => ({
				id: item.id,
				startTime: new Date(item.startTime).getTime(),
				endTime: new Date(item.endTime).getTime(),
				hasTeacher: item.hasTeacher,
				hasStudent: item.hasStudent,
			})),
		})
	},
	async POST(ctx: Context<KayozenState>): Promise<Response> {
		const body = await ctx.req.json()
		const subject = Number(body?.subject)
		const school = body?.school?.toString().trim()
		const startTimeRaw = body?.startTime?.toString()
		const endTimeRaw = body?.endTime?.toString()

		if (!subject) {
			throw new ValidationError("Subject is required", {
				field: "subject",
			})
		}

		if (!school) {
			throw new ValidationError("School is required", {
				field: "school",
			})
		}

		if (!startTimeRaw) {
			throw new ValidationError("Start time is required", {
				field: "startTime",
			})
		}

		if (!endTimeRaw) {
			throw new ValidationError("End time is required", {
				field: "endTime",
			})
		}

		const startTime = new Date(startTimeRaw)
		const endTime = new Date(endTimeRaw)

		if (Number.isNaN(startTime.getTime())) {
			throw new ValidationError("Invalid start time", {
				field: "startTime",
				value: startTimeRaw,
			})
		}

		if (Number.isNaN(endTime.getTime())) {
			throw new ValidationError("Invalid end time", {
				field: "endTime",
				value: endTimeRaw,
			})
		}

		if (endTime <= startTime) {
			throw new ValidationError("End time must be after start time", {
				startTime: startTimeRaw,
				endTime: endTimeRaw,
			})
		}

		const result = await db.insert(lecture).values({
			subject,
			school,
			startTime,
			endTime,
		}).returning()

		const createdLecture = result?.[0]

		return Response.json({
			success: true,
			id: createdLecture?.id,
			message: "Lecture created successfully",
		})
	},
}
