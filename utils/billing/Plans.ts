import { PagBankPlan } from "../interfaces.ts"
import { Client } from "./Client.ts"

export class Plans extends Client {
	createPlan(input: PagBankPlan) {
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
