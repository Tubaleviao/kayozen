export interface DbUser {
	id: Int16Array
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
