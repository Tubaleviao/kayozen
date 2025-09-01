export function makeUsername(length: number = 10) {
	let result = ""
	const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	for (let i = 0; i < length; i++) {
		result += alpha.charAt(Math.floor(Math.random() * alpha.length))
	}
	return result
}
