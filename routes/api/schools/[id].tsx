import { PageProps } from "fresh"
import { eq } from "drizzle-orm"
import { db } from "@/utils/db/index.ts"
import { schools } from "@/utils/db/schema/schools.ts"

export const handler = {
	async PATCH(ctx: PageProps) {
		const { id } = ctx.params
		const body = await ctx.req.json()
		const { name, cnpj } = body

		await db
			.update(schools)
			.set({
				name,
				cnpj,
			})
			.where(eq(schools.id, id))

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	},
}
