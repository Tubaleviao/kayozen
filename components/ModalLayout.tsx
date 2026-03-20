import { ComponentChildren } from "preact"

interface ModalLayoutProps {
	open: boolean
	onClose: () => void
	title: string
	children: ComponentChildren
}

export default function ModalLayout(
	{ open, onClose, title, children }: ModalLayoutProps,
) {
	if (!open) return null

	return (
		<div class="fixed inset-0 z-50 flex items-center justify-center p-6">
			{/* Backdrop */}
			<div
				class="absolute inset-0 bg-black/50 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div class="
				relative z-10 w-full max-w-md md:max-w-lg lg:max-w-xl
				rounded-2xl shadow-xl
				bg-light-background dark:bg-dark-background
				text-light-text dark:text-dark-text
				p-6 md:p-8
				">
				<h2 class="text-lg font-semibold border-b border-black/10 dark:border-white/10 pb-3">
					{title}
				</h2>

				<div class="mt-4 space-y-6">
					{children}
				</div>
			</div>
		</div>
	)
}
