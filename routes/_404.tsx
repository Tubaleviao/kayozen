import { Head } from "$fresh/runtime.ts"
import Error404Island from "../islands/Error404.tsx"
import Navbar from "../islands/Navbar.tsx"
import { useTranslationContext } from "../islands/TranslationContext.tsx"

export default function Error404() {
	const { t } = useTranslationContext()

	return (
		<>
			<Navbar />
			<Head>
				<title>{t("error.404.title")}</title>
			</Head>
			<Error404Island />
		</>
	)
}
