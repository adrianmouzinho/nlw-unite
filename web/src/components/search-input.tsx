import { SearchIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

interface SearchInputProps extends ComponentProps<'input'> {}

export function SearchInput(props: SearchInputProps) {
	return (
		<label className="relative">
			<span className="sr-only">{props.placeholder}</span>
			<input
				{...props}
				type="text"
				name="search"
				className="h-8 w-72 bg-transparent border border-white/10 text-sm pl-10 pr-3 rounded-lg placeholder:text-zinc-300"
			/>
			<SearchIcon className="size-4 text-emerald-300 absolute top-2 left-3" />
		</label>
	)
}
