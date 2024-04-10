import nlwUniteIcon from '../assets/nlw-unite-icon.svg'
import { NavLink } from './nav-link'

export function Header() {
	return (
		<header className="h-12 flex items-center gap-5">
			<img src={nlwUniteIcon} alt="Ícone do pass.in" />

			<nav className="flex items-center gap-5">
				<NavLink to="/">Eventos</NavLink>
			</nav>
		</header>
	)
}
