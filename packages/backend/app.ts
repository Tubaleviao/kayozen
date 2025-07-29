import { Application, Router } from "jsr:@oak/oak"

const app = new Application()
const port = +(Deno.env.get("PORT") ?? 8000)

// First we try to serve static files. If that fails, we
// fall through to the router below.
app.use(async (ctx, next) => {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/public`,
      index: "index.html",
    });
  } catch {
    next()
  }
})

const router = new Router()

// The /api/time endpoint returns the current time in ISO format.
router.get("/api/time", (ctx) => {
  ctx.response.body = { time: new Date().toISOString() }
});

// After creating the router, we can add it to the app.
app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port })
console.log(`Running on port ${port}`)