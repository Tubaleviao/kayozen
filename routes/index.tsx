import Footer from "../islands/Footer.tsx"
import Main from "../islands/Main.tsx"
import Navbar from "../islands/Navbar.tsx"

export default function Home() {
	return (
		<div class="flex flex-col min-h-screen">
			<Navbar />

			<Main />

			<Footer />
		</div>
	)
}
