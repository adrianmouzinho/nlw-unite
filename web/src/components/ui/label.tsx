import { type ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends ComponentProps<'label'> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			<label
				{...props}
				ref={ref}
				className={twMerge('text-sm font-medium block', className)}
			/>
		)
	},
)

export { Label }
