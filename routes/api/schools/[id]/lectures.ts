import { Context } from "fresh"
import { KayozenState } from "../../../../utils/interfaces.ts"
import { ValidationError } from "../../../../utils/errors.ts"
import { getSchoolLectures } from "../../../../utils/db/lectures.ts"

export const handler = {
	async GET(ctx: Context<KayozenState>): Promise<Response> {
		const schoolId = ctx.params.id

		if (!schoolId) {
			throw new ValidationError("School id is required")
		}

		const lectures = await getSchoolLectures(schoolId)

		return Response.json({ lectures }, { status: 200 })
	},
}
