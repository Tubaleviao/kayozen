import { FreshContext } from "$fresh/server.ts"

export const handler = async (_req: Request, _ctx: FreshContext) => {
	const form = await _req.formData()
	console.log(form, form.get("remember"))

	return new Response(null, { status: 200 })
}
