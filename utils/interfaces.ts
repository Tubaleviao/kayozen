import { Payload } from "djwt"
import { SupportedLang } from "./i18n.ts"
import { Role } from "./constants.ts"
import type { FreshContext as BaseFreshContext } from "$fresh/server.ts";

export type Theme = "light" | "dark"

export interface FreshContext extends BaseFreshContext {
  state: Partial<KayozenState>;
}

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
	role: Role
	person: string
	enrolled: string
}

export interface School {
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
	theme: Theme
	lang: SupportedLang
	dbUser: DbUser
}
