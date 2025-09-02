import { DataTypes, Model } from 'https://deno.land/x/denodb@v1.4.0/mod.ts'

export class UserModel extends Model{
	static override table = "users"
	static override timestamps = true

	static override fields = {
		id: { primaryKey: true, autoIncrement: true },
		name: DataTypes.STRING,
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		pasword_hash: DataTypes.STRING,
		google_picture: DataTypes.STRING,
	}
}
