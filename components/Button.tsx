import { JSX } from "preact/compat/jsx-dev-runtime"

export function Button(
	{ children, className = "", to, onClick, ...rest }:
		& JSX.HTMLAttributes<HTMLButtonElement>
		& { to?: string },
) {
	const handleClick = () => {
		if (to) globalThis.location.href = to
	}

	return (
		<button
			onClick={to ? handleClick : onClick}
			class={`px-4 py-2 rounded-md font-medium 
        bg-kayozen-light-primary text-white
        hover:bg-kayozen-light-secondary
        transition-colors ${className}`}
			{...rest}
		>
			{children}
		</button>
	)
}
