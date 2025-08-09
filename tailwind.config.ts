import { type Config } from "tailwindcss"

export default {
	darkMode: "class",
	content: [
		"{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
	],
	theme: {
		extend: {
			colors: {
				"kayozen-blue": "#2850acff",
				"kayozen-dark": "#0B1120",
				"kayozen-accent": "#22D3EE",
				"kayozen-bg-dark": "#054A91",
				"kayozen-title-light": "#054A91",
				"kayozen-bg-light": "#B0D7FF",
				"kayozen-title-dark": "#B0D7FF",
				"kayozen-bg-btn-dark": "#7ac977ff",
				"kayozen-bg-btn-light": "#2b6e25ff",
				// pallet:
				"kayozen-blue-dark": "#054A91",
				"kayozen-blue-light": "#B0D7FF",
				"kayozen-orange": "#E6C79C",
				"kayozen-green": "#00A676",
				"kayozen-blue-middle": "#6DAEDB",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.6s ease-out",
			},
		},
	},
} satisfies Config
