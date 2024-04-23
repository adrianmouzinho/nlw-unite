import { Link } from 'react-router-dom'

export function NotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold">Página não encontrada</h1>
			<p className="text-accent-foreground">
				Voltar para a página{' '}
				<Link
					className="text-orange-400 dark:text-orange-300 hover:underline"
					to="/"
				>
					inicial
				</Link>
				.
			</p>
		</div>
	)
}
