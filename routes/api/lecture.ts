import { Context } from "fresh"
import { KayozenState } from "../../utils/interfaces.ts"
import { db } from "../../utils/db/index.ts"
import { lecture } from "../../utils/db/schema/lecture.ts"
import { ValidationError } from "../../utils/errors.ts"

export const handler = {
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