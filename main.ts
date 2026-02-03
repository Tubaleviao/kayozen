import { App, staticFiles, trailingSlashes } from "fresh";
import { KayozenState } from "./utils/interfaces.ts"

export const app = new App<KayozenState>()
  // Add static file serving middleware
  .use(staticFiles())
  // Enable file-system based routing
  .fsRoutes()
  .use(trailingSlashes("never"))
