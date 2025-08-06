import { Handlers } from "$fresh/server.ts"
import LoginBox from "../islands/LoginBox.tsx"

export const handler: Handlers = {
	GET(_req, ctx) {
		return ctx.render({})
	},
}

export default function LoginPage() {
	return <LoginBox />
}
