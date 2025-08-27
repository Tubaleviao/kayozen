import { FreshContext, PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { getSessionUser } from "../utils/middleware.ts"

interface Data {
	email: string
}

export const handler = async (
	req: Request,
	ctx: FreshContext,
): Promise<Response> => {
	const [username, email, picture] = await getSessionUser(req) || []

	if (!email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}

	const resp = await ctx.render({ email })
	return resp
}

export default function Dashboard({ data: { email } }: PageProps<Data>) {
	return (
		<>
			<Navbar user={{ email, name: "teste" }} />
			<h1 class="text-2xl font-bold">Bem-vindo ao Kayozen</h1>
			<p class="mt-2">
				Você está logado como <strong>{email}</strong>.
			</p>
			<a
				href="/api/logout"
				class="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded"
			>
				Sair
			</a>
		</>
	)
}
