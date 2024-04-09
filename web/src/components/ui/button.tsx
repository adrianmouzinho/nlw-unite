import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
	primary?: boolean
}

export function Button({ primary = false, ...props }: ButtonProps) {
	return (
		<button
			{...props}
			type={props.type ?? 'button'}
			className={twMerge(
				primary
					? 'h-9 flex items-center gap-2 text-sm font-semibold text-black bg-orange-400 rounded-lg px-3 hover:bg-orange-300 transition-colors'
					: 'h-9 flex items-center gap-2 text-sm font-semibold text-zinc-50 bg-transparent rounded-lg px-3 border border-white/10 hover:bg-white/5 transition-colors',
				props.className,
			)}
		/>
	)
}
