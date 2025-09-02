import { Head } from "$fresh/runtime.ts"
import { PageProps } from "$fresh/server.ts"
import Error404Island from "../islands/Error404.tsx"
import Navbar from "../islands/Navbar.tsx"
import { useTranslationContext } from "../islands/TranslationContext.tsx"
import { KayozenState } from "../utils/interfaces.ts"

export default function Error404({ state }: PageProps) {
	const { t } = useTranslationContext()
	const { dbUser }: Partial<KayozenState> = state

	return (
		<>
			<Navbar user={dbUser} />
			<Head>
				<title>{t("error.404.title")}</title>
			</Head>
			<Error404Island />
		</>
	)
}
