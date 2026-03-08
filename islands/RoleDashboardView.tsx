// islands/RoleDashboardView.tsx
import AddProfessor from "./AddProfessor.tsx"
import { DbUser, School } from "../utils/interfaces.ts"
import { defineTFunction, SupportedLang } from "../utils/i18n.ts"
import { useState } from "preact/hooks"

interface Props {
	role?: string
	school?: School
	user?: DbUser | null
	lang: SupportedLang
}

export default function DashboardViewByRole(
	{ role, school, user, lang }: Props,
) {
	const [professors, setProfessors] = useState(user?.professors || [])
	if (!role) return null
	const t = defineTFunction(lang)

	if (role === "coordinator") {
		return (
			<section class="relative w-full max-w-[1000px] mx-auto mt-20 px-6 min-h-[520px]">
				{/* PROFESSORS */}
				<div class="
					flex flex-wrap justify-center gap-3 mb-10
					lg:absolute lg:top-0 lg:left-1/2 lg:-translate-x-1/2
					lg:max-w-[80%]
				">
					{professors?.map((p) => (
						<div
							key={p.email}
							class="
						w-16 h-16 md:w-18 md:h-18
						rounded-full flex items-center justify-center
						bg-light-surface dark:bg-dark-surface
						shadow-md text-sm
						"
						>
							{p.name.split(" ")[0]}
						</div>
					))}

					<AddProfessor
						school={school}
						lang={lang}
						onProfessorCreated={(prof) =>
							setProfessors((prev) => [...prev, prof])}
					/>
				</div>

				{/* CENTER SCHOOL */}
				<div class="
					flex flex-col items-center mb-10
					lg:absolute lg:top-1/2 lg:left-1/2
					lg:-translate-x-1/2 lg:-translate-y-1/2
				">
					<div class="text-[110px] md:text-[150px] leading-none">🏫</div>

					<p class="mt-3 font-semibold text-lg text-center">
						{school?.name}
					</p>
				</div>

				{/* CLASSES */}
				<div class="
					text-center mb-8
					lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2
				">
					Classes
				</div>

				{/* SCHEDULE */}
				<div class="
					text-center mb-8
					lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2
				">
					Schedule
				</div>

				{/* SETTINGS */}
				<div class="
					text-center
					lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2
				">
					School Settings
				</div>
			</section>
			// <section class="flex justify-center mt-12">

			// 	<div class="relative w-full max-w-[900px] aspect-[2/1] flex items-center justify-center">

			// 		{/* CENTER — SCHOOL */}
			// 		<div class="z-10 flex flex-col items-center">
			// 			<div class="text-9xl">🏫</div>
			// 			<p class="mt-5 font-semibold">{school?.name}</p>
			// 		</div>

			// 		{/* PROFESSORS ZONE (TOP) */}
			// 		<div class="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center max-w-[80%]">
			// 			{professors?.map((p) => (
			// 				<div
			// 				key={p.email}
			// 				class="w-16 h-16 rounded-full flex items-center justify-center
			// 				bg-light-surface dark:bg-dark-surface shadow-md text-sm"
			// 				>
			// 				{p.name.split(" ")[0]}
			// 				</div>
			// 			))}

			// 			{/* ADD PROFESSOR */}
			// 			<AddProfessor
			// 				school={school}
			// 				lang={lang}
			// 				onProfessorCreated={(prof) =>
			// 				setProfessors((prev) => [...prev, prof])
			// 				}
			// 			/>
			// 		</div>

			// 		{/* LEFT ZONE — FUTURE: CLASSES */}
			// 		<div class="absolute left-0 top-1/2 -translate-y-1/2 text-sm opacity-70">
			// 			Classes
			// 		</div>

			// 		{/* RIGHT ZONE — FUTURE: SCHEDULE */}
			// 		<div class="absolute right-0 top-1/2 -translate-y-1/2 text-sm opacity-70">
			// 			Schedule
			// 		</div>

			// 		{/* BOTTOM ZONE — FUTURE: SETTINGS */}
			// 		<div class="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm opacity-70">
			// 			School Settings
			// 		</div>

			// 	</div>

			// </section>
		)
	}

	if (role === "teacher") {
		return (
			<section class="flex flex-col items-center gap-8 mt-12">
				{/* Professor (usuário) */}
				<div class="w-36 h-36 rounded-full flex items-center justify-center 
           bg-light-surface dark:bg-dark-surface 
           shadow-md text-4xl">
					👩‍🏫
				</div>

				<p class="font-medium text-lg">
					{user?.name}
				</p>

				{/* CTA */}
				<a
					href="/schools"
					class="px-6 py-2 rounded-full 
           bg-light-primary text-white font-semibold hover:opacity-90 transition"
				>
					{t("dashboard.school.edit")}
				</a>

				{/* Placeholder */}
				<p class="text-sm text-light-muted dark:text-dark-muted">
					...
				</p>
			</section>
		)
	}

	return null
}
