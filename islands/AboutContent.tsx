import { useTranslationContext } from "./TranslationContext.tsx"

export default function AboutContent() {
    const { t } = useTranslationContext()

    return (
        <div class="space-y-12">

            {/* Hero */}
            <section>
                <h1 class="text-4xl font-bold mb-4">
                    {t("about.hero.title")}{" "}
                    <span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
                        {t("about.hero.brand")}
                    </span>
                </h1>

                <p class="text-lg max-w-2xl text-kayozen-light-muted dark:text-kayozen-dark-muted">
                    {t("about.hero.description")}
                </p>
            </section>

            {/* Mission */}
            <section>
                <h2 class="text-2xl font-semibold mb-3">
                    {t("about.mission.title")}
                </h2>

                <p class="text-base leading-relaxed max-w-3xl text-kayozen-light-muted dark:text-kayozen-dark-muted">
                    {t("about.mission.description")}
                </p>
            </section>

            {/* Values */}
            <section>
                <h2 class="text-2xl font-semibold mb-4">
                    {t("about.values.title")}
                </h2>

                <ul class="list-disc list-inside space-y-2 text-kayozen-light-muted dark:text-kayozen-dark-muted">
                    <li>{t("about.values.items.simplicity")}</li>
                    <li>{t("about.values.items.time")}</li>
                    <li>{t("about.values.items.clarity")}</li>
                    <li>{t("about.values.items.feedback")}</li>
                </ul>
            </section>

        </div>
    )
}
