import { Client } from "./Client.ts"

export class Subscribers extends Client {
	createSubscriber(user: {
		name: string
		email: string
	}) {
		return this.request<{
			id: string
		}>("/pre-approvals/customers", "POST", {
			name: user.name,
			email: user.email,
		})
	}
}
