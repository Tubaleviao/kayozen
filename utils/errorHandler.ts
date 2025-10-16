import { logError } from "./errors.ts"

export function handleError(error: unknown, req: Request, headers?: HeadersInit): Response {
	logError(error)

	// Banco offline
	if (
		error instanceof Error &&
		error.name == "ConnectionRefused"
	) {
		return Response.redirect(new URL("/db-offline", req.url))
	}

	// 401 não autorizado
	if (error instanceof Error && error.message.includes("Unauthorized")) {
		return new Response("Unauthorized", { status: 401, headers })
	}

	// Fallback para 500
	return new Response("Internal Server Error", { status: 500, headers })
}
