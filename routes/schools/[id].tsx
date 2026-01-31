// routes/schools/[id].tsx
import { FreshContext, PageProps } from "$fresh/server.ts"
import Navbar from "../../islands/Navbar.tsx"
import SchoolDetailsEditor from "../../islands/SchoolDetailsEditor.tsx"
import { useTranslationContext } from "../../islands/TranslationContext.tsx"
import { db } from "../../utils/db.ts"
import { DbUser, KayozenState, School } from "../../utils/interfaces.ts"
import { getSessionUser } from "../../utils/middleware.ts"

export const handler = async (
	req: Request,
	ctx: FreshContext,
): Promise<Response> => {
	const { id } = ctx.params
	const dbResult = await db.query(`select * from schools where id=$1`, [id])
	const dbUser = await getSessionUser(req)
	if (!dbUser?.email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}
	const resp = await ctx.render({ school: dbResult.rows[0], dbUser })
	return resp
}

interface Data {
	school: School
	dbUser: DbUser
}

export default function SchoolPage(
	{ state, data: { school, dbUser } }: PageProps<Data>,
) {
	const { t } = useTranslationContext()

	return (
		<>
			<Navbar user={dbUser} />

			<main class="flex-grow max-w-screen-lg mx-auto px-4 py-10 animate-fadeIn">
				<div class="text-center space-y-2 mb-10">
					<h1 class="text-2xl font-bold">
						{t("school.detail_title")}
					</h1>
					<p class="text-kayozen-light-muted dark:text-kayozen-dark-muted">
						ID: {school?.id}
					</p>
				</div>

				{school && <SchoolDetailsEditor school={school} />}
			</main>
		</>
	)
}
