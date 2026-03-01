// islands/SchoolIllustration.tsx
interface Props {
	label: string
	loading?: boolean
}

export default function SchoolIllustration({ label, loading }: Props) {
	return (
		<svg
			viewBox="20 40 240 220"
			xmlns="http://www.w3.org/2000/svg"
			class={`w-64 h-auto drop-shadow-lg transition-transform duration-300
				${loading ? "opacity-60" : "group-hover:scale-105"}`}
		>
			{/* Base */}
			<rect x="50" y="120" width="180" height="120" rx="8" fill="#fae26a" />

			{/* Roof */}
			<polygon points="40,120 140,50 240,120" fill="#c52929" />

			{/* Label */}
			<text
				x="140"
				y="145"
				text-anchor="middle"
				font-size="16"
				font-weight="600"
				fill="#42351e"
			>
				{label}
			</text>

			{/* Door */}
			<rect x="120" y="170" width="40" height="70" rx="4" fill="#9b6e4a" />

			{/* Windows */}
			<rect x="80" y="150" width="30" height="30" rx="4" fill="#71abf1" />
			<rect x="170" y="150" width="30" height="30" rx="4" fill="#71abf1" />
		</svg>
	)
}
