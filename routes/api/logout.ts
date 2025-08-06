export const handler = (): Response => {
	const headers = new Headers({
		"Set-Cookie": "auth_token=; Path=/; Max-Age=0;",
		"Location": "/",
	})

	return new Response(null, {
		status: 302,
		headers,
	})
}
