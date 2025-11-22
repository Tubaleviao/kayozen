import { PageProps } from "$fresh/server.ts"
import Footer from "../islands/Footer.tsx"
import Navbar from "../islands/Navbar.tsx"
import Plans from "../islands/Plans.tsx"
import { KayozenState, Plan } from "../utils/interfaces.ts"

export default function PlansPage({ data }: PageProps<KayozenState>) {
	const plans: Plan[] = [
		{
			key: "basic",
			price: "R$ 20,00",
			url: "https://pag.ae/81eSfQ861",
		},
		{
			key: "pro",
			price: "R$ 50,00",
			url: "https://pag.ae/81eTC17jr",
		},
		{
			key: "enterprise",
			price: "R$ 150,00", // t("billing.contact_us"),
			url: "https://pag.ae/81eTCED-m",
		},
	]

	return (
		<div class="flex flex-col min-h-screen bg-kayozen-light-bg dark:bg-kayozen-dark-bg text-kayozen-light-text dark:text-kayozen-dark-text">
			<Navbar user={data?.dbUser} />

			<Plans plans={plans} />

			<Footer />
		</div>
	)
}
