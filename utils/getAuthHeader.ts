import { create } from "djwt"
import { JWT_SECRET, ONE_DAY } from "./constants.ts"
import { JwtPayload } from "./interfaces.ts"

export const getAuthHeader = async (name: string, email: string) => {
	const payload: JwtPayload = {
		name: name,
		email: email,
		exp: Math.floor(Date.now() / 1000) + ONE_DAY * 30,
	}
	const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, JWT_SECRET)
	sessionStorage.setItem("jwt", jwt)

	const headers = new Headers({
		"Set-Cookie": `auth_token=${jwt}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
			ONE_DAY * 30
		};`,
		"Location": "/dashboard",
	})
	return headers
}
