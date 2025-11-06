export function getCookieValue(
	cookie: string | null,
	key: string,
): string | undefined {
	return cookie?.match(new RegExp(`${key}=([^;]+)`))?.[1]
}
