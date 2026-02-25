// islands/SchoolIllustration.tsx
interface Props {
	label: string
	loading?: boolean
}

export default function SchoolIllustration({ label, loading }: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 128 128"
			class={`w-40 h-40 drop-shadow-lg transition-transform duration-300
				${loading ? "opacity-60" : "group-hover:scale-105"}`}
		>
			{/* Base */}
			<rect
				x="12"
				y="64"
				width="104"
				height="44"
				rx="6"
				class="fill-kayozen-light-surface dark:fill-kayozen-dark-surface
				stroke-kayozen-light-primary dark:stroke-kayozen-dark-primary"
				stroke-width="3"
			/>

			{/* Roof */}
			<path
				d="M10 66 L64 34 L118 66 Z"
				class="fill-kayozen-light-primary dark:fill-kayozen-dark-primary animate-school-glow"
			/>

			{/* Door */}
			<rect
				x="58"
				y="82"
				width="12"
				height="26"
				rx="2"
				class="fill-kayozen-light-text/70 dark:fill-kayozen-dark-text/70"
			/>

			{/* Sign */}
			<rect
				x="50"
				y="48"
				width="28"
				height="10"
				rx="2"
				class="fill-kayozen-light-surface dark:fill-kayozen-dark-surface
				stroke-kayozen-light-primary dark:stroke-kayozen-dark-primary"
				stroke-width="2"
			/>
			<text
				x="64"
				y="56"
				text-anchor="middle"
				class="fill-kayozen-light-primary dark:fill-kayozen-dark-primary"
				style="font: 600 7px sans-serif;"
			>
				{label}
			</text>
		</svg>
	)
}
