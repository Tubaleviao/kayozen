import { Client } from "./Client.ts"

export class Subscriptions extends Client {
	createSubscription(input: {
		planId: string
		subscriberId: string
	}) {
		return this.request<{
			id: string
			links: { rel: string; href: string }[]
		}>("/pre-approvals", "POST", {
			plan: {
				id: input.planId,
			},
			customer: {
				id: input.subscriberId,
			},
		})
	}
}
