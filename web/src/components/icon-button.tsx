import type { ComponentProps } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {
	transparent?: boolean
}

export function IconButton({ transparent = false, ...props }: IconButtonProps) {
	return (
		<button
			{...props}
			type={props.type ?? 'button'}
			className={
				transparent
					? 'bg-black/20 border border-white/10 rounded-md p-1.5 hover:bg-black/30 hover:text-white transition-opacity'
					: 'bg-white/10 border border-white/10 rounded-md p-1.5 enabled:hover:bg-white/15 enabled:hover:text-white transition-opacity disabled:opacity-50'
			}
		/>
	)
}
