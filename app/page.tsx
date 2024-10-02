import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='container mx-auto px-4 py-8'>
			<h1 className='text-4xl font-bold mb-6'>
				Welcome to Our Classified Platform
			</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<h2 className='text-2xl font-semibold mb-4'>Featured Listings</h2>
					{/* TODO: Add featured listings component */}
				</div>
				<div>
					<h2 className='text-2xl font-semibold mb-4'>Categories</h2>
					{/* TODO: Add categories list component */}
				</div>
			</div>
			<div className='mt-8'>
				<Button asChild>
					<Link href='/posts/new'>Create a New Listing</Link>
				</Button>
			</div>
		</div>
	)
}
