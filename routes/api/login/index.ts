import { PageProps } from "fresh"
import client from "../../../utils/google_oauth.ts"

export const handler = async ( _ctx: PageProps) => {
	const { uri, codeVerifier } = await client.code.getAuthorizationUri()
	sessionStorage.setItem("codeVerifier", codeVerifier)
	return Response.redirect(uri, 302)
}
