export const JWT_SECRET = await crypto.subtle.generateKey(
	{ name: "HMAC", hash: "SHA-512" },
	true,
	["sign", "verify"],
)
export const ONE_DAY = 24 * 60 * 60

export type Role = "student" | "teacher" | "coordinator"
