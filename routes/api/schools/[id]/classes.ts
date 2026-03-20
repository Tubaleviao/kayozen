import { Context } from "fresh"
import { KayozenState } from "@/utils/interfaces.ts"
import { ValidationError } from "@/utils/errors.ts"
import { getSchoolClasses } from "@/utils/db/classes.ts"

export const handler = {
	async GET(ctx: Context<KayozenState>): Promise<Response> {
		const schoolId = ctx.params.id

		if (!schoolId) {
			throw new ValidationError("School id is required")
		}

		const classes = await getSchoolClasses(schoolId)

		return Response.json({ classes }, { status: 200 })
	},
}
