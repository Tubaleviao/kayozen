import { OAuth2Client } from "https://deno.land/x/oauth2_client/mod.ts"

const client = new OAuth2Client({
	clientId: Deno.env.get("GOOGLE_CLIENT_ID")!,
	clientSecret: Deno.env.get("GOOGLE_CLIENT_SECRET")!,
	authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
	tokenUri: "https://oauth2.googleapis.com/token",
	redirectUri: `http://localhost:${Deno.env.get("PORT")!}/api/callback`,
	defaults: {
		scope: "openid email profile",
	},
})

export default client
