import { JWT_SECRET } from "../../utils/constants.ts"
import { saveUser } from "../../utils/db.ts"
import client from "../../utils/google_oauth.ts"
import { create } from "djwt"

export const handler = async (req: Request): Promise<Response> => {
	const url = new URL(req.url)
	const code = url.searchParams.get("code")

	if (!code) {
		return new Response("Missing code", { status: 400 })
	}

	const codeVerifier = sessionStorage.getItem("codeVerifier") || ""
	const tokens = await client.code.getToken(req.url, { codeVerifier })

	sessionStorage.setItem("accessToken", tokens.accessToken)
	const userInfo = await fetch(
		"https://www.googleapis.com/oauth2/v3/userinfo",
		{
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		},
	).then((res) => res.json())

	console.log("User info:", userInfo)
	const user = await saveUser(userInfo)
	const ONE_DAY = 24 * 60 * 60

	console.log("user", user)
	const payload = {
		name: user.columns?.[0], // Database ID
		email: user.columns?.[1],
		picture: user.columns?.[2],
		exp: Math.floor(Date.now() / 1000) + ONE_DAY * 30,
	}
	const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, JWT_SECRET)

	const headers = new Headers({
		"Set-Cookie": `auth_token=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
			ONE_DAY * 30
		};`,
		"Location": "/dashboard",
	})

	return new Response(null, { status: 307, headers })
}
