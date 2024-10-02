import Link from 'next/link'
import { SignInButton } from '@/components/SignInButton'
import { UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import SearchInput from '../SearchInput'

export function Header() {
	return (
		<header className='flex items-center justify-between p-4'>
			<div className='flex items-center flex-grow'>
				<Link href='/' className='text-2xl font-bold mr-4'>
					Classified Platform
				</Link>
				<div className='flex items-center flex-grow'>
					<SearchInput />
					<Button className='ml-[-1px]'>Search</Button>
				</div>
			</div>
			<nav>
				<ul className='flex space-x-4 items-center'>
					<li>
						<Link href='/posts/new'>
							<Button>Create Listing</Button>
						</Link>
					</li>
					<li>
						<SignInButton />
					</li>
					<li>
						<UserButton afterSignOutUrl='/' />
					</li>
				</ul>
			</nav>
		</header>
	)
}
