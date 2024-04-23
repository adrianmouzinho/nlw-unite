import { type ComponentProps, type ReactNode, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'input'> {
	icon: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type, className, icon, ...props }, ref) => {
		return (
			<div className="relative">
				<input
					{...props}
					ref={ref}
					type={type ?? 'text'}
					className={twMerge(
						'h-10 w-full pl-11 pr-3 bg-transparent border border-white/10 text-sm rounded-lg placeholder:text-zinc-300 outline-none focus:ring focus:ring-teal-200',
						className,
					)}
				/>
				<span className="absolute left-3 top-2.5">{icon}</span>
			</div>
		)
	},
)

export { Input }
