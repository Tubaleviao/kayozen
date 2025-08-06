interface NavbarProps {
	itens: { name: string; page: string }[]
}

export default function Navbar(props?: NavbarProps) {
	return (
		<nav class="block w-full max-w-screen-lg px-4 py-2 mx-auto text-white bg-white shadow-md rounded-md lg:px-8 lg:py-3 mt-10">
			<div class="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
				<a
					href="#"
					class="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
				>
					Inicio
				</a>
				<a
					href="#"
					class="mr-4 block cursor-pointer py-1.5 text-base text-slate-800 font-semibold"
				>
					Quem somos nós
				</a>
				<div class="hidden lg:block">
					<ul class="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
						<li class="flex items-center p-1 text-sm gap-x-2 text-slate-600">
							<a href="login" class="flex items-center">
								Login
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}
