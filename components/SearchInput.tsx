import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'

const SearchInput: React.FC = () => {
	return (
		<div className='relative w-full max-w-sm'>
			<Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
			<Input
				type='search'
				placeholder='What are you looking for?'
				className='pl-8 pr-4'
			/>
		</div>
	)
}

export default SearchInput
