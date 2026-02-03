import { createDefine } from "fresh";
import { KayozenState } from "./utils/interfaces.ts"

// This specifies the type of "ctx.state" which is used to share
// data among middlewares, layouts and routes.

export const define = createDefine<KayozenState>();
