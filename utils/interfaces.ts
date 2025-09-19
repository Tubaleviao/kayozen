import { Payload } from "djwt"
import { SupportedLang } from "./i18n.ts"
import { Role } from "./constants.ts"

export interface DbUser {
	id: string
	name: string
	username: string
	email: string
	password_hash?: string
	google_picture?: string
	created_at: Date
	roles?: DbRole[]
	schools?: School[]
}

export interface DbRole {
	id: string
	name: Role
}

export interface School{
	id: string
	cnpj: string
	name: string
	created_at: string
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
