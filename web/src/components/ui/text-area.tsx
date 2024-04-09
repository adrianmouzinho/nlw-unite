import { type ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface TextAreaProps extends ComponentProps<'textarea'> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	({ className, ...props }, ref) => {
		return (
			<textarea
				{...props}
				ref={ref}
				className={twMerge(
					'border border-white/10 rounded-lg px-3 py-2 bg-transparent outline-none resize-none w-full text-sm',
					className,
				)}
			/>
		)
	},
)

export { TextArea }
