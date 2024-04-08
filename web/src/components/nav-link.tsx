import type { NavLinkProps as ReactRouterNavLinkProps } from 'react-router-dom'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'

interface NavLinkProps extends ReactRouterNavLinkProps {
	children: string
}

export function NavLink({ children, ...props }: NavLinkProps) {
	return (
		<ReactRouterNavLink
			{...props}
			className={({ isActive }) =>
				isActive
					? 'text-zinc-50 font-medium text-sm'
					: 'text-zinc-300 font-medium text-sm hover:text-zinc-50 transition-colors'
			}
		>
			{children}
		</ReactRouterNavLink>
	)
}
