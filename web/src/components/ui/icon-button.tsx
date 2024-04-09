import { type ComponentProps, forwardRef } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {
	transparent?: boolean
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ transparent = false, type, className, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				type={type ?? 'button'}
				className={
					transparent
						? 'bg-black/20 border border-white/10 rounded-md p-1.5 hover:bg-black/30 hover:text-white transition-opacity'
						: 'bg-white/10 border border-white/10 rounded-md p-1.5 enabled:hover:bg-white/15 enabled:hover:text-white transition-opacity disabled:opacity-50'
				}
			/>
		)
	},
)

export { IconButton }
