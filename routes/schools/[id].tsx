import { PageProps } from "fresh"
import Footer from "../../islands/Footer.tsx"
import Navbar from "../../islands/Navbar.tsx"
import SchoolDetailsEditor from "../../islands/SchoolDetailsEditor.tsx"
import { db } from "../../utils/db.ts"
import { KayozenState, School } from "../../utils/interfaces.ts"
import { getSessionUser } from "../../utils/middleware.ts"

export const handler = async (
	ctx: PageProps
) => {
	const { id } = ctx.params
	const dbResult = await db.query(`select * from schools where id=$1`, [id])
	const dbUser = await getSessionUser(ctx.req)
	if (!dbUser?.email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}
	return { school: dbResult.rows[0] }
}

interface Data {
	school: School
	state: KayozenState
}

export default function SchoolPage(
	{ school, state }: Data,
) {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar state={state} />

			<main class="grow max-w-(--breakpoint-lg) mx-auto px-4 py-10 animate-fadeIn">
				{school && <SchoolDetailsEditor school={school} lang={state.lang} />}
			</main>

			<Footer state={state}/>
		</div>
	)
}
