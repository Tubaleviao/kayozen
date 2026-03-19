import { PageProps } from "fresh"
import { ValidationError } from "../../../../utils/errors.ts"
import { getSchoolProfessors } from "../../../../utils/db/professors.ts"

export const handler = {
	async GET(ctx: PageProps) {
		const { id } = ctx.params

		if (!id) {
			throw new ValidationError("School id is required")
		}

		const professors = await getSchoolProfessors(id)

		return Response.json({ professors }, { status: 200 })
	},
}
