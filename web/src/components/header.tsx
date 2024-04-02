import nlwUniteIcon from '../assets/nlw-unite-icon.svg'

export function Header() {
	return (
		<header className="h-12 flex items-center gap-5">
			<img src={nlwUniteIcon} alt="Ícone do pass.in" />

			<nav className="flex items-center gap-5 font-medium text-sm">
				<a href="/events" className="text-zinc-300">
					Eventos
				</a>
				<a href="/attendees">Participantes</a>
			</nav>
		</header>
	)
}
