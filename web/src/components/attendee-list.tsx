import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	MoreHorizontalIcon,
	SearchIcon,
} from 'lucide-react'
import { IconButton } from './icon-button'

export function AttendeeList() {
	return (
		<div className="grid gap-4">
			<div className="flex items-center gap-3">
				<h1 className="text-2xl leading-snug font-bold">Participantes</h1>
				<div className="relative">
					<label htmlFor="search" className="sr-only">
						Buscar participantes
					</label>
					<input
						type="text"
						name="search"
						id="search"
						className="h-8 w-72 bg-transparent border border-white/10 text-sm pl-10 pr-3 rounded-lg outline-none ring-0 placeholder:text-zinc-300"
						placeholder="Buscar participantes..."
					/>
					<SearchIcon className="size-4 text-emerald-300 absolute top-2 left-3" />
				</div>
			</div>

			<div className="border border-white/10 rounded-lg">
				<table className="w-full">
					<thead className="text-sm font-semibold">
						<tr className="border-b border-white/10 text-left">
							<th className="py-3 pl-4 pr-2.5">
								<input
									type="checkbox"
									className="size-4 bg-black/20 rounded border border-white/10 text-orange-400 focus:ring-orange-400"
								/>
							</th>
							<th className="py-3 px-2.5">Código</th>
							<th className="py-3 px-2.5">Participante</th>
							<th className="py-3 px-2.5">Data de inscrição</th>
							<th className="py-3 px-2.5">Data do check-in</th>
							<th className="py-3 pl-2.5 pr-4"></th>
						</tr>
					</thead>
					<tbody className="text-sm text-zinc-300">
						{Array.from({ length: 10 }).map((_, i) => {
							return (
								// biome-ignore lint: using index as key to test
								<tr key={i} className="border-b border-white/10">
									<td className="w-11 py-3 pl-4 pr-2.5">
										<input
											type="checkbox"
											className="size-4 bg-black/20 rounded border border-white/10 text-orange-400 focus:ring-orange-400"
										/>
									</td>
									<td className="py-3 px-2.5">143</td>
									<td className="py-3 px-2.5">
										<div className="flex flex-col gap-1">
											<span className="text-zinc-50 font-semibold">
												Adrian Mouzinho
											</span>
											<span className="text-xs">
												adrianmouzinho@example.com
											</span>
										</div>
									</td>
									<td className="py-3 px-2.5">7 dias atrás</td>
									<td className="py-3 px-2.5">3 dias atrás</td>
									<td className="w-16 py-3 pl-2.5 pr-4 text-right">
										<IconButton transparent>
											<MoreHorizontalIcon className="size-4" />
										</IconButton>
									</td>
								</tr>
							)
						})}
					</tbody>
					<tfoot className="text-sm text-zinc-300">
						<tr>
							<td colSpan={3} className="py-3 px-4">
								Mostrando 10 de 228 itens
							</td>
							<td colSpan={3} className="py-3 px-4 text-right">
								<div className="inline-flex items-center gap-8">
									<span>Página 1 de 11</span>

									<div className="flex gap-1.5">
										<IconButton>
											<ChevronsLeftIcon className="size-4" />
										</IconButton>
										<IconButton>
											<ChevronLeftIcon className="size-4" />
										</IconButton>
										<IconButton>
											<ChevronRightIcon className="size-4" />
										</IconButton>
										<IconButton>
											<ChevronsRightIcon className="size-4" />
										</IconButton>
									</div>
								</div>
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}
