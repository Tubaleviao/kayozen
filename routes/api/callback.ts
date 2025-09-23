import { db } from "../../utils/db.ts"
import client from "../../utils/google_oauth.ts"
import { DbUser, GoogleUser } from "../../utils/interfaces.ts"
import { getAuthHeader } from "../../utils/getAuthHeader.ts"
import { logError } from "../../utils/errors.ts"

export const handler = async (req: Request): Promise<Response> => {
	const url = new URL(req.url)
	const code = url.searchParams.get("code")

	if (!code) {
		return new Response("Missing code", { status: 400 })
	}

	const codeVerifier = sessionStorage.getItem("codeVerifier") || ""
	const tokens = await client.code.getToken(req.url, { codeVerifier })

	const userInfo: GoogleUser = await fetch(
		"https://www.googleapis.com/oauth2/v3/userinfo",
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		},
	).then((res) => res.json())

	let user: DbUser

	if (userInfo.email) {
		const dbUser = await db.getUserByEmail(userInfo.email)
		if (dbUser) user = dbUser
		else {
			const dbResponse = await db.saveUser(userInfo)
			if (dbResponse) user = dbResponse
			else return new Response("Could not insert new user", { status: 500 })
		}
	} else {
		const error = "Could not get user info from google"
		logError(error)
		return new Response(error, { status: 500 })
	}

	//console.log("User info:", userInfo)

	//console.log("DB User:", user)

	const headers = await getAuthHeader(user.name, user.email)

	return new Response(null, { status: 307, headers })
}
