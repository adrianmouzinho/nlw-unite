import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps extends ComponentProps<'label'> {}

export function Label(props: LabelProps) {
	return (
		<label
			{...props}
			className={twMerge('text-sm font-medium block', props.className)}
		/>
	)
}
