import { PageProps } from "fresh"
import Footer from "../islands/Footer.tsx"
import Navbar from "../islands/Navbar.tsx"
import SignupBox from "../islands/SignupBox.tsx"
import { KayozenState } from "@/utils/interfaces.ts"

export const handler = {
	GET(_ctx: PageProps<KayozenState>) {
		return {}
	},
}

export default function LoginPage({ state }: { state: KayozenState }) {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar state={state} />

			<div class="grow max-w-(--breakpoint-lg) mx-auto px-4 py-10 animate-fadeIn">
				<SignupBox lang={state.lang} />
			</div>

			<Footer state={state} />
		</div>
	)
}
