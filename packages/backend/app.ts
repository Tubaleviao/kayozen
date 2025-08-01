import { Application, Router } from "jsr:@oak/oak"

const app = new Application()
const port = +(Deno.env.get("PORT") ?? 8000)

app.use(async (ctx, next) => {
	try {
		await ctx.send({
			root: `${Deno.cwd()}/public`,
			index: "index.html",
		})
	} catch {
		next()
	}
})

const router = new Router()

router.get("/api/time", (ctx) => {
	ctx.response.body = { time: new Date().toISOString() }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port })
console.log(`Running on port ${port}`)
