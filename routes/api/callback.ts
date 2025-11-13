import { db } from "../../utils/db.ts"
import client from "../../utils/google_oauth.ts"
import { DbUser, GooglePerson } from "../../utils/interfaces.ts"
import { getAuthHeader } from "../../utils/getAuthHeader.ts"
import { logError } from "../../utils/errors.ts"
import { handleError } from "../../utils/errorHandler.ts"

export const handler = async (req: Request): Promise<Response> => {
	const url = new URL(req.url)
	const code = url.searchParams.get("code")

	if (!code) {
		return new Response("Missing code", { status: 400 })
	}

	const codeVerifier = sessionStorage.getItem("codeVerifier") || ""
	const tokens = await client.code.getToken(req.url, { codeVerifier })

	console.log("Getting user info from Google...")
	const personFields: GooglePerson = await fetch(
		"https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos",
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		},
	).then((res) => res.json())

	let user: DbUser

	if (personFields && personFields?.emailAddresses?.[0].value) {
		let email = personFields?.emailAddresses?.[0].value
		let dbUser
		try {
			dbUser = await db.getUserByEmail(email)
		} catch (error: any) {
			return handleError(error, req)
		}
		if (dbUser) user = dbUser
		else {
			const dbResponse = await db.saveUser(personFields)
			if (dbResponse) user = dbResponse
			else return new Response("Could not insert new user", { status: 500 })
		}
	} else {
		const error = "Could not get user info from google"
		logError(error)
		return new Response(error, { status: 500 })
	}
	const headers = await getAuthHeader(user.name, user.email)
	return new Response(null, { status: 307, headers })
}
