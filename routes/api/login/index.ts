import { FreshContext } from "$fresh/server.ts"
import client from "../../../utils/google_oauth.ts"

export const handler = async (_req: Request, _ctx: FreshContext) => {
	const { uri, codeVerifier } = await client.code.getAuthorizationUri()
	sessionStorage.setItem("codeVerifier", codeVerifier)
	return Response.redirect(uri, 302)
}
