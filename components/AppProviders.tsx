import { ToastProvider } from "./ToastProvider.tsx"

export default function AppProviders(
	{ children }: { children: preact.ComponentChildren },
) {
	return (
		<ToastProvider>
			{children}
		</ToastProvider>
	)
}
