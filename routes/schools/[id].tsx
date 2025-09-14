// routes/schools/[id].tsx
import { Handlers, PageProps } from "$fresh/server.ts"
import { query } from "../../utils/db.ts"
import { useTranslationContext } from "../../islands/TranslationContext.tsx"
import Navbar from "../../islands/Navbar.tsx"
import { KayozenState } from "../../utils/interfaces.ts"

interface Data {
	school?: { id: string; name: string }
}

export const handler: Handlers<Data> = {
	async GET(_req, ctx) {
		const { id } = ctx.params
		const q = await query("SELECT id, name FROM schools WHERE id = $1", [id])
		const school = q.rows?.[0] as any
		if (!school) return new Response("Not found", { status: 404 })
		return ctx.render({ school })
	},
}

export default function SchoolPage({ state, data }: PageProps<Data>) {
	const { dbUser }: Partial<KayozenState> = state
	const { t } = useTranslationContext()
	const { school } = data // FIX PAGE HEIGHT
	return (
		<>
			<Navbar user={dbUser} />
			<main class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
				<div class="text-center space-y-2">
					<h1 class="text-2xl font-bold text-kayozen-light-text dark:text-kayozen-dark-text">
						{t("school.detail_title")}: {school?.name}
					</h1>
					<p class="text-kayozen-light-muted dark:text-kayozen-dark-muted">
						{t("school.detail_id")}: {school?.id}
					</p>
				</div>
			</main>
		</>
	)
}
