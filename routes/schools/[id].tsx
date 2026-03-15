import { PageProps } from "fresh"
import Footer from "../../islands/Footer.tsx"
import Navbar from "../../islands/Navbar.tsx"
import SchoolDetailsEditor from "../../islands/SchoolDetailsEditor.tsx"
import { KayozenState, School } from "../../utils/interfaces.ts"
import { getSessionUser } from "../../utils/middleware.ts"
import { schools } from "../../utils/db/schema/schools.ts"
import { eq } from "drizzle-orm"
import { db } from "../../utils/db/index.ts"

export const handler = async (
	ctx: PageProps,
) => {
	const { id } = ctx.params
	const dbResult = await db.select().from(schools).where(eq(schools.id, id))
	const dbUser = await getSessionUser(ctx.req)
	if (!dbUser?.email) {
		return new Response(null, { status: 302, headers: { "Location": "/" } })
	}
	return { data: { school: dbResult[0] } }
}

interface Data {
	school: School
}

export default function SchoolPage(
	{ data: { school }, state }: PageProps<Data, KayozenState>,
) {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar state={state} />

			<main class="grow max-w-(--breakpoint-lg) mx-auto px-4 py-10 animate-fadeIn">
				{school && <SchoolDetailsEditor school={school} lang={state.lang} />}
			</main>

			<Footer state={state} />
		</div>
	)
}
