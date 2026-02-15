import { AppError } from "./errors.ts"
import { jsonErrorResponse } from "./errorResponse.ts"
import { logError } from "./errors.ts"

export async function withErrorHandling(
  ctx: any,
  next: () => Promise<Response>,
): Promise<Response> {
  try {
    return await next()
  } catch (err) {
    logError(err)

    const url = new URL(ctx.req.url)
    const isApiRoute = url.pathname.startsWith("/api")

    if (err instanceof AppError) {
      if (isApiRoute) {
        return jsonErrorResponse(err)
      }

      // Page routes
      if (err.status === 401) {
        return Response.redirect(new URL("/login", ctx.req.url))
      }

      if (err.status === 503) {
        return Response.redirect(new URL("/db-offline", ctx.req.url))
      }

      return new Response(err.message, { status: err.status })
    }

    // Unknown error
    if (isApiRoute) {
      return jsonErrorResponse(
        new AppError(
          "Internal Server Error",
          500,
          "INTERNAL_ERROR",
        ),
      )
    }

    return new Response("Internal Server Error", { status: 500 })
  }
}
