import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	MoreHorizontalIcon,
	SearchIcon,
} from 'lucide-react'

import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

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

			<Table>
				<thead>
					<TableRow>
						<TableHeader className="w-12">
							<input
								type="checkbox"
								className="size-4 bg-black/20 rounded border border-white/10 text-orange-400 focus:ring-orange-400"
							/>
						</TableHeader>
						<TableHeader>Código</TableHeader>
						<TableHeader>Participante</TableHeader>
						<TableHeader>Data de inscrição</TableHeader>
						<TableHeader>Data do check-in</TableHeader>
						<TableHeader className="w-16"></TableHeader>
					</TableRow>
				</thead>
				<tbody>
					{Array.from({ length: 10 }).map((_, i) => {
						return (
							// biome-ignore lint: using index as key to test
							<TableRow key={i}>
								<TableCell>
									<input
										type="checkbox"
										className="size-4 bg-black/20 rounded border border-white/10 text-orange-400 focus:ring-orange-400"
									/>
								</TableCell>
								<TableCell>143</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<span className="text-zinc-50 font-semibold">
											Adrian Mouzinho
										</span>
										<span className="text-xs">adrianmouzinho@example.com</span>
									</div>
								</TableCell>
								<TableCell>7 dias atrás</TableCell>
								<TableCell>3 dias atrás</TableCell>
								<TableCell>
									<IconButton transparent>
										<MoreHorizontalIcon className="size-4" />
									</IconButton>
								</TableCell>
							</TableRow>
						)
					})}
				</tbody>
				<tfoot>
					<tr>
						<TableCell colSpan={3}>Mostrando 10 de 228 itens</TableCell>
						<TableCell colSpan={3} className="text-right">
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
						</TableCell>
					</tr>
				</tfoot>
			</Table>
		</div>
	)
}
