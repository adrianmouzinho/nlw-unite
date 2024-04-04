import type { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<'a'> {
	children: string
}

export function NavLink({ children, ...props }: NavLinkProps) {
	return (
		<a
			{...props}
			className="text-zinc-300 font-medium text-sm hover:text-zinc-50 transition-colors"
		>
			{children}
		</a>
	)
}
