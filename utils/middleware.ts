export function getSessionEmail(req: Request): string | null {
	const cookie = req.headers.get("cookie")
	if (!cookie) return null

	const match = cookie.match(/auth_token=([^;]+)/)
	if (!match) return null

	const email = decodeURIComponent(match[1])

	// Aqui você poderia validar o token contra um banco, JWT etc.
	return email
}
