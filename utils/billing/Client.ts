export class Client {
	protected baseUrl: string
	protected token: string

	constructor() {
		this.token = Deno.env.get("PAGBANK_TOKEN_TEST") ??
			Deno.env.get("PAGBANK_TOKEN") ?? ""

		this.baseUrl = Deno.env.get("PAGBANK_TOKEN_TEST")
			? "https://sandbox.api.pagseguro.com"
			: "https://api.pagseguro.com"
	}

	protected async request<T>(
		path: string,
		method: "GET" | "POST" | "PUT" | "DELETE",
		body?: unknown,
	): Promise<T> {
		const res = await fetch(`${this.baseUrl}${path}`, {
			method,
			headers: {
				Authorization: `Bearer ${this.token}`,
				"Content-Type": "application/json",
			},
			body: body ? JSON.stringify(body) : undefined,
		})

		if (!res.ok) {
			const error = await res.text()
			throw new Error(`PagBank error: ${error}`)
		}

		return res.json()
	}
}
