import { App, staticFiles, trailingSlashes } from "fresh"
import { KayozenState } from "./utils/interfaces.ts"
import { errorHandling, getAppState } from "./utils/middleware.ts"

export const app = new App<KayozenState>()
	// Add static file serving middleware
	.use(staticFiles())
	.use(getAppState)
	.use(trailingSlashes("never"))
	// Enable file-system based routing
	.use(errorHandling)
	.fsRoutes()
