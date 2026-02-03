import { HttpError, PageProps } from "fresh"
import Navbar from "../islands/Navbar.tsx"
import Error404Island from "../islands/Error404.tsx"
import { Head } from "fresh/runtime"
import { useTranslationContext } from "../islands/TranslationContext.tsx"
import { KayozenState } from "../utils/interfaces.ts"

export default function ErrorPage(props: PageProps<KayozenState>) {
  const error = props.error; // Contains the thrown Error or HTTPError
  const { t } = useTranslationContext()
  if (error instanceof HttpError) {
    const status = error.status; // HTTP status code

    // Render a 404 not found page
    if (status === 404) {
      return (
        <>
          <Navbar user={props.data.dbUser} />
          <Head>
            <title>{t("error.404.title")}</title>
          </Head>
          <Error404Island />
        </>
      )
    }else if(status === 500){
      return (
        <div class="min-h-screen flex flex-col bg-kayozen-light-background dark:bg-kayozen-dark-background text-kayozen-light-text dark:text-kayozen-dark-text">
          <Navbar user={props.data.dbUser} />
          <main class="flex flex-col items-center justify-center flex-grow text-center p-6">
            <h1 class="text-3xl font-bold text-red-600 dark:text-red-400">
              {t("error.500.title")}
            </h1>
            <p class="mt-4 text-kayozen-light-muted dark:text-kayozen-dark-muted max-w-lg">
              {t("error.500.description")}
            </p>
          </main>
        </div>
      )
    }
  }

  return <h1>Oh no...</h1>;
}
