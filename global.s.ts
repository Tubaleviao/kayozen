declare global {
	var toast: ((message: string, type?: "success" | "error") => void) | undefined
}

export {}
