export const logError = (error: any) => {
	console.error(`${error.name}: ${error.message}`)
}

export type ErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "DB_OFFLINE"
  | "INTERNAL_ERROR"

export class AppError extends Error {
  status: number
  code: ErrorCode
  details?: unknown

  constructor(
    message: string,
    status: number,
    code: ErrorCode,
    details?: unknown,
  ) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

/* Common Errors */

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED")
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN")
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Not Found") {
    super(message, 404, "NOT_FOUND")
  }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input", details?: unknown) {
    super(message, 400, "VALIDATION_ERROR", details)
  }
}

export class DatabaseOfflineError extends AppError {
  constructor(message = "Database unavailable") {
    super(message, 503, "DB_OFFLINE")
  }
}
