// islands/ToastHost.tsx
import { useEffect, useState } from "preact/hooks"

type Toast = {
	id: string
	message: string
	type?: "success" | "error"
}

export default function ToastHost() {
	const [toasts, setToasts] = useState<Toast[]>([])

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id))
	}

	useEffect(() => {
		globalThis.toast = (
			message: string,
			type: "success" | "error" = "success",
		) => {
			const id = crypto.randomUUID()

			setToasts((prev) => [...prev, { id, message, type }])

			setTimeout(() => {
				removeToast(id)
			}, 2000)
		}

		return () => {
			globalThis.toast = undefined
		}
	}, [])

	return (
		<div class="fixed top-6 right-6 space-y-4 z-50">
			{toasts.map((toast) => {
				const isError = toast.type === "error"

				return (
					<div
						key={toast.id}
						onClick={() => removeToast(toast.id)}
						class={`
              group relative overflow-hidden
              w-80
              rounded-2xl
              backdrop-blur-md
              border
              shadow-xl
              transition-all duration-300
              cursor-pointer
              hover:scale-[1.02]
              active:scale-[0.98]
              animate-slide-in
              ${
							isError
								? "bg-red-500/90 border-red-400 text-white"
								: "bg-emerald-500/90 border-emerald-400 text-white"
						}
            `}
					>
						<div class="flex items-start gap-3 p-4">
							<div class="text-lg">
								{isError ? "⚠️" : "✅"}
							</div>

							<div class="flex-1 text-sm font-medium">
								{toast.message}
							</div>
						</div>

						<div
							class={`
                absolute bottom-0 left-0 h-1
                ${isError ? "bg-red-300" : "bg-emerald-300"}
                animate-progress
              `}
						/>
					</div>
				)
			})}
		</div>
	)
}
