import { defineTFunction, SupportedLang } from "../utils/i18n.ts"

export default function Error500Island({ lang }: { lang: SupportedLang }) {
	const t = defineTFunction(lang)

	return (
		<div class="w-screen flex items-center justify-center bg-light-background dark:bg-dark-background px-4">
			<div class="max-w-(--breakpoint-md) text-center animate-fadeIn">
				{/* Broken-gear illustration built with pure CSS/SVG */}
				<div class="relative mx-auto mb-8 w-28 h-28 flex items-center justify-center">
					<svg
						viewBox="0 0 80 80"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="w-28 h-28 text-red-500 dark:text-red-400 opacity-90"
						aria-hidden="true"
					>
						{/* Outer gear path */}
						<path
							d="M32 4h16l2 8a28 28 0 0 1 7.6 4.4l8-2 8 13.8-6.2 5.4a28.1 28.1 0 0 1 0 8.8l6.2 5.4-8 13.8-8-2A28 28 0 0 1 50 64l-2 8H32l-2-8a28 28 0 0 1-7.6-4.4l-8 2-8-13.8 6.2-5.4a28.1 28.1 0 0 1 0-8.8L6.4 28l8-13.8 8 2A28 28 0 0 1 30 12l2-8Z"
							stroke="currentColor"
							stroke-width="3"
							stroke-linejoin="round"
							fill="currentColor"
							fill-opacity="0.1"
						/>
						{/* Inner circle */}
						<circle
							cx="40"
							cy="40"
							r="11"
							stroke="currentColor"
							stroke-width="3"
							fill="currentColor"
							fill-opacity="0.15"
						/>
						{/* Lightning bolt — "something broke" */}
						<path
							d="M43 29 L35 42 H41 L37 55 L49 38 H43 Z"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="1"
							stroke-linejoin="round"
						/>
					</svg>
				</div>

				{/* Status code */}
				<p class="text-6xl font-black tracking-tight text-red-500 dark:text-red-400 leading-none mb-2">
					500
				</p>

				{/* Title */}
				<h1 class="text-2xl font-bold text-light-text dark:text-dark-text mt-1">
					{t("error.500.title")}
				</h1>

				{/* Description */}
				<p class="mt-3 text-lg text-light-muted dark:text-dark-muted max-w-sm mx-auto">
					{t("error.500.description")}
				</p>

				{/* Back home button */}
				<a
					href="/"
					class="mt-8 inline-block px-6 py-3 rounded-2xl shadow-md bg-light-primary dark:bg-dark-primary text-white font-medium hover:opacity-90 transition"
				>
					{t("error.500.back")}
				</a>
			</div>
		</div>
	)
}
