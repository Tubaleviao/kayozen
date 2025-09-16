import { Payload } from "djwt"
import { SupportedLang } from "./i18n.ts"

export interface DbUser {
	id: string
	name: string
	username: string
	email: string
	password_hash?: string
	google_picture?: string
	created_at: Date
}

export interface GoogleUser {
	email: string
	name: string
	picture: string
	given_name: string
	family_name: string
}

export interface JwtPayload extends Payload {
	name: string
	email: string
	exp: number
}

export interface KayozenState {
	theme: "light" | "dark"
	lang: SupportedLang
	dbUser: DbUser
}
