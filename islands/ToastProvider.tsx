import { createContext } from "preact"
import { useContext, useState } from "preact/hooks"

type ToastType = "success" | "error"

export interface Toast {
	id: string
	message: string
	type: ToastType
}

export interface ToastContextValue {
	success: (msg: string) => void
	error: (msg: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
	const ctx = useContext(ToastContext)
	if (!ctx) throw new Error("useToast must be used inside ToastProvider")
	return ctx
}

export default function ToastProvider(
	{ children }: { children: preact.ComponentChildren },
) {
	const [toasts, setToasts] = useState<Toast[]>([])

	function push(type: ToastType, message: string) {
		const id = crypto.randomUUID()
		setToasts((prev) => [...prev, { id, type, message }])

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id))
		}, 3000)
	}

	return (
		<ToastContext.Provider
			value={{
				success: (msg) => push("success", msg),
				error: (msg) => push("error", msg),
			}}
		>
			{children}

			{/* Toast container */}
			<div class="fixed top-4 right-4 z-50 space-y-3">
				{toasts.map((toast) => (
					<div
						key={toast.id}
						class={`px-4 py-3 rounded-lg shadow-lg text-white animate-fadeIn
              ${
							toast.type === "success"
								? "bg-kayozen-light-secondary dark:bg-kayozen-dark-secondary"
								: "bg-red-600"
						}`}
					>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	)
}
