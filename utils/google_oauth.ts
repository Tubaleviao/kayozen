import { OAuth2Client } from "@cmd-johnson/oauth2-client"
import { getEnvVar } from "./env.ts"

const client = new OAuth2Client({
	clientId: getEnvVar("GOOGLE_CLIENT_ID")!,
	clientSecret: getEnvVar("GOOGLE_CLIENT_SECRET")!,
	authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
	tokenUri: "https://oauth2.googleapis.com/token",
	redirectUri: `${getEnvVar("GOOGLE_REDIRECT")}/api/callback`,
	defaults: {
		scope: "openid email profile",
	},
})

export default client
