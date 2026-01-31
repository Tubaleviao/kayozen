import { PageProps } from "$fresh/server.ts"
import Footer from "../islands/Footer.tsx"
import Navbar from "../islands/Navbar.tsx"
import { KayozenState } from "../utils/interfaces.ts"

export default function AboutPage({ data }: PageProps<KayozenState>) {
    return (
        <div class="flex flex-col min-h-screen bg-kayozen-light-bg dark:bg-kayozen-dark-bg text-kayozen-light-text dark:text-kayozen-dark-text">
            <Navbar user={data?.dbUser} />

            <main class="flex-grow max-w-screen-lg mx-auto px-4 py-12 animate-fadeIn space-y-12">

                {/* Hero */}
                <section>
                    <h1 class="text-4xl font-bold mb-4">
                        About{" "}
                        <span class="text-kayozen-light-primary dark:text-kayozen-dark-primary">
                            Kayozen
                        </span>
                    </h1>

                    <p class="text-lg text-kayozen-light-muted dark:text-kayozen-dark-muted max-w-2xl">
                        Kayozen was created to make managing teacher availability
                        simple, transparent, and stress-free — for schools and
                        educators alike.
                    </p>
                </section>

                {/* Mission */}
                <section>
                    <h2 class="text-2xl font-semibold mb-3">
                        Why we built it
                    </h2>

                    <p class="text-base leading-relaxed max-w-3xl text-kayozen-light-muted dark:text-kayozen-dark-muted">
                        We saw schools struggling with spreadsheets, WhatsApp messages,
                        last-minute changes, and manual processes that consume time
                        and create confusion. Kayozen exists to replace that chaos
                        with clarity — helping schools organize availability and
                        helping teachers keep control over their schedules.
                    </p>
                </section>

                {/* Team */}
                <section>
                    <h2 class="text-2xl font-semibold mb-4">
                        The team
                    </h2>

                    <div class="space-y-2">
                        <p class="text-lg font-medium">
                            Alvaro & Bianca
                        </p>

                        <p class="text-base max-w-3xl text-kayozen-light-muted dark:text-kayozen-dark-muted">
                            We’re a small, independent team passionate about building
                            practical tools that solve real problems. Kayozen is
                            designed, built, and improved with direct feedback from
                            educators and school administrators.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section>
                    <h2 class="text-2xl font-semibold mb-4">
                        What we believe in
                    </h2>

                    <ul class="list-disc list-inside space-y-2 text-kayozen-light-muted dark:text-kayozen-dark-muted">
                        <li>Simplicity over complexity</li>
                        <li>Respect for teachers’ time</li>
                        <li>Clear communication and transparency</li>
                        <li>Continuous improvement through feedback</li>
                    </ul>
                </section>

            </main>

            <Footer />
        </div>
    )
}
