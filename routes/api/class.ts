import { Context } from "fresh"
import { KayozenState } from "@/utils/interfaces.ts"
import { db } from "@/utils/db/index.ts"
import { classTable } from "@/utils/db/schema/class.ts"
import { ValidationError } from "@/utils/errors.ts"

export const handler = {
	async POST(ctx: Context<KayozenState>): Promise<Response> {
		const body = await ctx.req.json()
		const name = body?.name?.toString().trim()
		const schoolId = body?.schoolId?.toString().trim()

		if (!name) {
			throw new ValidationError("Class name is required", {
				field: "name",
			})
		}

		const result = await db.insert(classTable).values({
			name,
			school: schoolId,
		}).returning()

		const createdClass = result?.[0]

		return Response.json({
			success: true,
			id: createdClass?.id,
			message: "Class created successfully",
		})
	},
}
