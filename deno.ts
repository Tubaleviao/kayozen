Deno.serve({ port: +(Deno.env.get("PORT") ?? 3000) }, async (req) => {
	console.log("Method:", req.method)

	const url = new URL(req.url)
	console.log("Path:", url.pathname)
	console.log("Query parameters:", url.searchParams)

	console.log("Headers:", req.headers)

	if (req.body) {
		const body = await req.text()
		console.log("Body:", body)
	}

	const json = { "hello": "world" }
	const body = JSON.stringify(json)
	const headers = { "content-type": "application/json" }
	const status = 200

	return new Response(body, { status, headers })
})
