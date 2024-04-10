import { type ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
	primary?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ primary = false, type, className, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				type={type ?? 'button'}
				className={twMerge(
					primary
						? 'h-9 flex items-center gap-2 text-sm font-semibold text-black bg-orange-400 rounded-lg px-3 enabled:hover:bg-orange-300 transition-colors disabled:opacity-50'
						: 'h-9 flex items-center gap-2 text-sm font-semibold text-zinc-50 bg-transparent rounded-lg px-3 border border-white/10 enabled:hover:bg-white/5 transition-colors disabled:opacity-50',
					className,
				)}
			/>
		)
	},
)

export { Button }
