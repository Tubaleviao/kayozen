import { AppError } from "./errors.ts"

export function jsonErrorResponse(error: AppError): Response {
	return new Response(
		JSON.stringify({
			error: {
				code: error.code,
				message: error.message,
				details: error.details ?? null,
			},
		}),
		{
			status: error.status,
			headers: {
				"Content-Type": "application/json",
			},
		},
	)
}
