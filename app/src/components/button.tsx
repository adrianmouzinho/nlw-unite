import { type ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
	transparent?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ transparent = false, type, className, ...props }, ref) => {
		return (
			<button
				{...props}
				ref={ref}
				type={type ?? 'button'}
				className={twMerge(
					transparent
						? 'h-10 px-3 text-sm font-semibold bg-transparent rounded-lg enabled:hover:text-white transition-colors disabled:opacity-50'
						: 'h-10 px-3 text-sm font-semibold text-teal-950 bg-orange-400 uppercase rounded-lg enabled:hover:text-teal-900 transition-colors disabled:opacity-50',
					className,
				)}
			/>
		)
	},
)

export { Button }
