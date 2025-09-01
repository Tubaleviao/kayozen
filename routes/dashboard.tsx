import { FreshContext, PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { DbUser } from "../utils/interfaces.ts"
import { getSessionUser } from "../utils/middleware.ts"

interface Data {
	dbUser: DbUser
}

export const handler = async (
	req: Request,
	ctx: FreshContext,
): Promise<Response> => {
	const dbUser = await getSessionUser(req)

	if (!dbUser?.email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}

	const resp = await ctx.render({ dbUser })
	return resp
}

export default function Dashboard({ data: { dbUser } }: PageProps<Data>) {
	return (
		<>
			<Navbar user={dbUser} />
			<h1 class="text-2xl font-bold">Bem-vindo ao Kayozen</h1>
			<p class="mt-2">
				Você está logado como <strong>{dbUser.email}</strong>.
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
