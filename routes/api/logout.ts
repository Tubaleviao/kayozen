export const handler = (): Response => {
	const headers = new Headers({
		"Set-Cookie": "kayotoken=; Path=/; Max-Age=0;",
		"Location": "/",
	})

	return new Response(null, {
		status: 302,
		headers,
	})
}
