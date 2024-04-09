import { type ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'input'> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type, className, ...props }, ref) => {
		return (
			<input
				{...props}
				ref={ref}
				type={type ?? 'text'}
				className={twMerge(
					'h-8 w-full bg-transparent border border-white/10 text-sm px-3 rounded-lg placeholder:text-zinc-300',
					className,
				)}
			/>
		)
	},
)

export { Input }
