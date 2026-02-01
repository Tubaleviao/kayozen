import { Client } from "./Client.ts"

export class Plans extends Client {
	createPlan(input: {
		name: string
		amount: number // em centavos
		interval: "MONTHLY" | "YEARLY"
	}) {
		return this.request<{
			id: string
			name: string
		}>("/pre-approvals/plans", "POST", {
			name: input.name,
			amount: {
				value: input.amount,
				currency: "BRL",
			},
			interval: {
				unit: input.interval,
				value: 1,
			},
		})
	}
}
