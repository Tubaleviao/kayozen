import client from "../../utils/google_oauth.ts"

export const handler = async (req: Request): Promise<Response> => {
	const url = new URL(req.url)
	const code = url.searchParams.get("code")

	if (!code) {
		return new Response("Missing code", { status: 400 })
	}

	const codeVerifier = sessionStorage.getItem("codeVerifier") || ""
	console.log(req.url, codeVerifier)
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

	console.log("User info:", userInfo) // contains email, name, picture, etc.

	const headers = new Headers({
		"Set-Cookie":
			`auth_token=${userInfo.email}; Path=/; HttpOnly; SameSite=Lax`,
		"Location": "/dashboard",
	})

	return new Response(null, { status: 307, headers })
}
