import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Classified Platform',
	description: 'Buy and sell items in your local community',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<div className='flex flex-col min-h-screen'>
						<Header />
						<main className='flex-grow'>{children}</main>
						<Footer />
					</div>
				</body>
			</html>
		</ClerkProvider>
	)
}
