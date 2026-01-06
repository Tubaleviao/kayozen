// islands/CreateSchool.tsx
import { useState } from "preact/hooks"
import { useTranslationContext } from "./TranslationContext.tsx"
import { DbUser } from "../utils/interfaces.ts"

interface CreateSchoolProps {
	user?: DbUser | null
}

export default function CreateSchool({ user }: CreateSchoolProps) {
	const { t } = useTranslationContext()
	const [loading, setLoading] = useState(false)
	const [err, setErr] = useState<string | null>(null)

	async function handleCreate() {
		try {
			setLoading(true)
			setErr(null)

			const res = await fetch("/api/schools", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: t("school.default_name"), userId: user?.id }),
			})

			if (!res.ok) {
				const data = await res.json().catch(() => ({}))
				throw new Error(data?.error ?? t("school.error_create"))
			}
			const data = await res.json()

			window.location.href = `/schools/${data.id}`
		} catch (e) {
			setErr(e instanceof Error ? e.message : t("school.error_unexpected"))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div class="flex flex-col items-center gap-4">
			<button
				type="button"
				onClick={handleCreate}
				disabled={loading}
				class="group relative"
				aria-label={t("school.aria_label")}
				title={t("school.tooltip")}
			>
				{/* SVG */}
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
					{/* Telhado com animação de brilho */}
					<path
						d="M10 66 L64 34 L118 66 Z"
						class="fill-kayozen-light-primary dark:fill-kayozen-dark-primary animate-school-glow"
					/>
					{/* Porta */}
					<rect
						x="58"
						y="82"
						width="12"
						height="26"
						rx="2"
						class="fill-kayozen-light-text/70 dark:fill-kayozen-dark-text/70"
					/>
					{/* Janelas */}
					<rect
						x="28"
						y="82"
						width="16"
						height="14"
						rx="2"
						class="fill-kayozen-light-background dark:fill-kayozen-dark-background 
                   stroke-kayozen-light-muted dark:stroke-kayozen-dark-muted"
						stroke-width="2"
					/>
					<rect
						x="84"
						y="82"
						width="16"
						height="14"
						rx="2"
						class="fill-kayozen-light-background dark:fill-kayozen-dark-background 
                   stroke-kayozen-light-muted dark:stroke-kayozen-dark-muted"
						stroke-width="2"
					/>
					{/* Placa */}
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
						{t("school.label")}
					</text>
				</svg>

				{!loading && (
					<span class="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-kayozen-light-muted dark:text-kayozen-dark-muted">
						{t("school.click_hint")}
					</span>
				)}
			</button>

			{loading && (
				<p class="text-sm text-kayozen-light-muted dark:text-kayozen-dark-muted">
					{t("school.creating")}
				</p>
			)}
			{err && <p class="text-sm text-red-500">{err}</p>}
		</div>
	)
}
