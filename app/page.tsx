import { auth } from '@clerk/nextjs/server'

export default function Home() {
	const { userId } = auth()

	return (
		<main>
			<h1>Welcome to the Classified Web App</h1>
			{userId ? (
				<p>You are logged in with user ID: {userId}</p>
			) : (
				<p>You are not logged in</p>
			)}
		</main>
	)
}
