import { type PageProps } from "$fresh/server.ts"
export default function App({ Component }: PageProps) {
	return (
		<html>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Kayozen</title>
				<link rel="stylesheet" href="/styles.css" />
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
				/>
			</head>
			<body>
				<Component />
			</body>
		</html>
	)
}
