import { JSX } from "preact"

export function Button(
	{ children, className = "", ...other }:
		& JSX.HTMLAttributes<HTMLButtonElement>
		& { to?: string },
) {
	const handleClick = () => {
		globalThis.location.href = other.to || ""
	}
	return (
		<button
			onClick={other.to ? handleClick : other.onClick}
			class={`px-4 py-2 rounded-md font-medium 
              bg-kayozen-light-primary text-white
              hover:bg-kayozen-light-secondary
              transition-colors ${className}`}
			{...other}
		>
			{children}
		</button>
	)
}
