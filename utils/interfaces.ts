import { Payload } from "djwt"
import { SupportedLang, TranslationKey } from "./i18n.ts"
import { Role } from "./constants.ts"

export interface WeekTimelineLecture {
	id: number
	startTime: number
	endTime: number
	hasTeacher: boolean
	hasStudent: boolean
}

export type Theme = "light" | "dark"

export interface DbUser {
	id: string
	name: string
	username: string
	email: string
	plan: KayoPlan
	permission: KayoPermission
	createdAt: Date
	googlePicture?: string | null
	passwordHash?: string | null
	roles?: DbRole[] | null
	schools?: School[] | null
	fictitious?: boolean | null
	cpf?: string | null
}

export interface Professor {
	name: string
	email?: string | null
	fictitious: boolean
}

export interface Subject {
	name: string
}

export interface DbRole {
	id: string | number
	role: Role
	person: string
	enrolled: string
}

export interface School {
	id: string
	cnpj?: string
	name: string
	created_at?: string
	professors?: Professor[] | null
}

export interface GooglePerson {
	resourceName: string
	etag: string
	names?: GoogleName[]
	photos?: GooglePhoto[]
	emailAddresses?: GoogleEmailAddress[]
}

export interface GoogleName {
	metadata: GoogleMetadata
	displayName: string
	familyName: string
	givenName: string
	displayNameLastFirst?: string
	unstructuredName?: string
}

export interface GooglePhoto {
	metadata: GoogleMetadata
	url: string
}

export interface GoogleEmailAddress {
	metadata: GoogleMetadata & { verified?: boolean }
	value: string
}

export interface GoogleMetadata {
	primary?: boolean
	sourcePrimary?: boolean
	source: {
		type: "PROFILE" | "ACCOUNT" | string
		id: string
	}
}

export interface JwtPayload extends Payload {
	name: string
	email: string
	exp: number
}

export type tFunction = (
	key: TranslationKey,
	vars?: Record<string, string | number>,
) => string

export interface KayozenState {
	theme?: Theme
	lang: SupportedLang
	dbUser?: DbUser
	currentRole?: string
	currentSchool?: string
	error?: string
}

export interface Plan {
	key: KayoPlan
	price: string
	url: string
}

export type KayoPlan = "free" | "basic" | "pro" | "enterprise"

export interface PagBankPlan {
	name: string
	amount: number // centavos
	interval: "MONTHLY" | "YEARLY"
}

export type KayoPermission = "admin" | "user"

export interface KayoClass {
	id: number
	name: string
}

export interface KayoSubject {
	id: number
	name: string
}

export interface KayoLecture {
	id: number
	subject: number
	school: string
	startTime: string | Date
	endTime: string | Date
}
