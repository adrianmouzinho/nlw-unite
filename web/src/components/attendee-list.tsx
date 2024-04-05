import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	MoreHorizontalIcon,
	SearchIcon,
} from 'lucide-react'
import { type ChangeEvent, useState } from 'react'

import { attendees } from '../data/attendees'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function AttendeeList() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	const totalPages = Math.ceil(attendees.length / 10)

	function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value)
	}

	function goToNextPage() {
		if (page + 1 > totalPages) {
			return
		}

		setPage((prev) => prev + 1)
	}

	function goToPreviousPage() {
		if (page - 1 <= 0) {
			return
		}

		setPage((prev) => prev - 1)
	}

	function goToFirstPage() {
		if (page === 1) {
			return
		}

		setPage(1)
	}

	function goToLastPage() {
		if (page === totalPages) {
			return
		}

		setPage(totalPages)
	}

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
						onChange={onSearchInputChanged}
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
					{attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
						return (
							<TableRow key={attendee.id}>
								<TableCell>
									<input
										type="checkbox"
										className="size-4 bg-black/20 rounded border border-white/10 text-orange-400 focus:ring-orange-400"
									/>
								</TableCell>
								<TableCell>{attendee.id}</TableCell>
								<TableCell>
									<div className="flex flex-col gap-1">
										<span className="text-zinc-50 font-semibold">
											{attendee.name}
										</span>
										<span className="text-xs">{attendee.email}</span>
									</div>
								</TableCell>
								<TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
								<TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
						<TableCell colSpan={3}>
							Mostrando 10 de {attendees.length} itens
						</TableCell>
						<TableCell colSpan={3} className="text-right">
							<div className="inline-flex items-center gap-8">
								<span>
									Página {page} de {totalPages}
								</span>

								<div className="flex gap-1.5">
									<IconButton onClick={goToFirstPage} disabled={page === 1}>
										<ChevronsLeftIcon className="size-4" />
									</IconButton>
									<IconButton onClick={goToPreviousPage} disabled={page === 1}>
										<ChevronLeftIcon className="size-4" />
									</IconButton>
									<IconButton
										onClick={goToNextPage}
										disabled={page === totalPages}
									>
										<ChevronRightIcon className="size-4" />
									</IconButton>
									<IconButton
										onClick={goToLastPage}
										disabled={page === totalPages}
									>
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
