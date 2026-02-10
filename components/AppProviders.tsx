import ToastProvider from "../islands/ToastProvider.tsx"
import { TranslationProvider } from "./TranslationContext.tsx"

export default function AppProviders(
	{ children }: { children: preact.ComponentChildren },
) {
	return (
        <ToastProvider>
            <TranslationProvider>
                {children}
            </TranslationProvider>
        </ToastProvider>
	)
}
