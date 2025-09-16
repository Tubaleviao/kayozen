import { PageProps } from "$fresh/server.ts"
import Navbar from "../islands/Navbar.tsx"
import { defautGuard } from "../utils/guards.ts"
import { DbUser } from "../utils/interfaces.ts"

interface Data {
	dbUser: DbUser
}

export const handler = defautGuard

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
