import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader(props: TableHeaderProps) {
	return (
		<th
			{...props}
			className={twMerge(
				'py-3 px-4 text-sm font-semibold text-left',
				props.className,
			)}
		/>
	)
}
