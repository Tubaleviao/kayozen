import { Handler } from "fresh/server.ts"
import { Subscribers } from "../../../utils/billing/Subscribers.ts"
import { Subscriptions } from "../../../utils/billing/Subscriptions.ts"
import { getSessionUser } from "../../../utils/middleware.ts"

export const handler: Handler = async (req, _ctx) => {
	const { planId } = await req.json()
	const dbUser = await getSessionUser(req)

	const subscribers = new Subscribers()
	const subscriptions = new Subscriptions()

	// 1. criar subscriber (ou buscar do banco)
	const subscriber = await subscribers.createSubscriber({
		name: dbUser?.name ?? "",
		email: dbUser?.email ?? "",
	})

	// 2. criar subscription
	const subscription = await subscriptions.createSubscription({
		planId,
		subscriberId: subscriber.id,
	})

	const checkoutUrl = subscription.links.find((l) => l.rel === "PAYMENT")?.href

	return Response.json({ checkoutUrl })
}
