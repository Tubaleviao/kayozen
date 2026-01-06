import { verify } from "djwt"
import { JWT_SECRET } from "./constants.ts"
import { db } from "./db.ts"
import { DbUser, JwtPayload } from "./interfaces.ts"
import { logError } from "./errors.ts"

export async function getSessionUser(
	req: Request,
): Promise<DbUser | undefined> {
	let dbUser
	try {
		const cookie = req.headers.get("cookie")
		if (!cookie) throw new Error("No Cookie")

		const match = cookie.match(/kayotoken=([^;]+)/)
		if (!match) throw new Error("No kayotoken")

		const jwt = match[1]

		const payload: JwtPayload = await verify(jwt, JWT_SECRET)

		dbUser = await db.getUserByEmail(payload.email)
		if (!dbUser?.email) throw new Error("User was deleted")
	} catch (error: any) {
		logError(error)
	}
	return dbUser
}
