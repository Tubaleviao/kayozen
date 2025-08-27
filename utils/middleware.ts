import { verify } from "djwt"
import { JWT_SECRET } from "./constants.ts"
import { getUserByEmail } from "./db.ts"

export async function getSessionUser(
	req: Request,
): Promise<string[] | undefined> {
	try {
		const cookie = req.headers.get("cookie")
		if (!cookie) return

		const match = cookie.match(/auth_token=([^;]+)/)
		if (!match) return

		const jwt = match[1]

		const payload: any = await verify(jwt, JWT_SECRET)

		const user = await getUserByEmail(payload.email)
		return user.columns
	} catch (error) {
		console.error("Authentication error:", error)
		return
	}
}
