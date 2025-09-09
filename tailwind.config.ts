import { type Config } from "tailwindcss"

export default {
	darkMode: "class",
	content: [
		"{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
	],
	theme: {
		extend: {
			colors: {
				kayozen: {
					light: {
						primary: "#2563EB",
						secondary: "#16A34A",
						background: "#F9FAFB",
						surface: "#FFFFFF",
						text: "#111827",
						muted: "#6B7280",
					},
					dark: {
						primary: "#60A5FA",
						secondary: "#4ADE80",
						background: "#111827",
						surface: "#1F2937",
						text: "#F9FAFB",
						muted: "#9CA3AF",
					},
				},
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"school-glow": {
					"0%, 100%": { opacity: "1", filter: "brightness(1)" },
					"50%": { opacity: "0.8", filter: "brightness(1.3)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.6s ease-out",
				"school-glow": "school-glow 2.5s ease-in-out infinite",
			},
		},
	},
} satisfies Config
