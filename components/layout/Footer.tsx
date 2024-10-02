import Link from 'next/link'

export function Footer() {
	return (
		<footer className='bg-gray-100 mt-auto'>
			<div className='container mx-auto px-4 py-8'>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div>
						<h3 className='text-lg font-semibold mb-4'>About Us</h3>
						<p>
							Your trusted platform for buying and selling in your local
							community.
						</p>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
						<ul className='space-y-2'>
							<li>
								<Link href='/about'>About</Link>
							</li>
							<li>
								<Link href='/terms'>Terms of Service</Link>
							</li>
							<li>
								<Link href='/privacy'>Privacy Policy</Link>
							</li>
							<li>
								<Link href='/contact'>Contact Us</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className='text-lg font-semibold mb-4'>Connect With Us</h3>
						{/* Add social media links here */}
					</div>
				</div>
				<div className='mt-8 text-center'>
					<p>&copy; 2023 Classified Platform. All rights reserved.</p>
				</div>
			</div>
		</footer>
	)
}
