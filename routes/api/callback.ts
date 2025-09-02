import { JWT_SECRET } from "../../utils/constants.ts"
import { getUserByEmail, saveUser } from "../../utils/db.ts"
import client from "../../utils/google_oauth.ts"
import { create } from "djwt"
import { DbUser, GoogleUser, JwtPayload } from "../../utils/interfaces.ts"

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

	const user: DbUser = userInfo.email
		? await getUserByEmail(userInfo.email)
		: await saveUser(userInfo)

	console.log("User info:", userInfo)

	const ONE_DAY = 24 * 60 * 60

	console.log("DB User:", user)
	const payload: JwtPayload = {
		name: user.name,
		email: user.email,
		exp: Math.floor(Date.now() / 1000) + ONE_DAY * 30,
	}
	console.log("Calback", payload)
	const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, JWT_SECRET)
	sessionStorage.setItem("jwt", jwt)

	const headers = new Headers({
		"Set-Cookie": `auth_token=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
			ONE_DAY * 30
		};`,
		"Location": "/dashboard",
	})

	return new Response(null, { status: 307, headers })
}
