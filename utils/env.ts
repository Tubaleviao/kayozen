import process from "node:process"

export function getEnvVar(name: string): string | undefined {
	// Deno runtime
	if (typeof globalThis.Deno !== "undefined") {
		return globalThis.Deno.env.get(name)
	}

	// Node (Vite dev server)
	if (typeof process !== "undefined") {
		return process.env[name]
	}

	// Browser
	return undefined
}
