import { verify } from "djwt"
import { JWT_SECRET } from "./constants.ts"
import { getUserByEmail } from "./db.ts"
import { DbUser, JwtPayload } from "./interfaces.ts"

export async function getSessionUser(
	req: Request,
): Promise<DbUser | undefined> {
	let dbUser
	try {
		const cookie = req.headers.get("cookie")
		if (!cookie) throw new Error("No Cookie")

		const match = cookie.match(/auth_token=([^;]+)/)
		if (!match) throw new Error("No auth_token")

		//console.log("Match", match)
		const jwt = match[1]

		const payload: JwtPayload = await verify(jwt, JWT_SECRET)

		dbUser = await getUserByEmail(payload.email)
		if (!dbUser.email) throw new Error("User was deleted")
		//console.log("getSessionUser", dbUser, payload)
	} catch (error) {
		console.error("Authentication error:", error)
	}
	return dbUser
}
