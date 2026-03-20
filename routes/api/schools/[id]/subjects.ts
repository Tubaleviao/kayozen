import { Context } from "fresh"
import { KayozenState } from "@/utils/interfaces.ts"
import { ValidationError } from "@/utils/errors.ts"
import { getSchoolSubjects } from "@/utils/db/subjects.ts"

export const handler = {
	async GET(ctx: Context<KayozenState>): Promise<Response> {
		const schoolId = ctx.params.id

		if (!schoolId) {
			throw new ValidationError("School id is required")
		}

		const subjects = await getSchoolSubjects(schoolId)

		return Response.json({ subjects }, { status: 200 })
	},
}
