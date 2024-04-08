import { Link } from 'react-router-dom'

export function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Página não encontrada</h1>
			<p className="text-accent-foreground">
				Voltar para a página de{' '}
				<Link
					className="text-orange-500 dark:text-orange-400 hover:underline"
					to="/events"
				>
					eventos
				</Link>{' '}
				ou{' '}
				<Link
					className="text-orange-500 dark:text-orange-400 hover:underline"
					to="/attendees"
				>
					participantes
				</Link>
				.
			</p>
		</div>
	)
}
