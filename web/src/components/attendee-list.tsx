import { keepPreviousData, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	Loader2Icon,
	MoreHorizontalIcon,
	SearchIcon,
} from 'lucide-react'
import { type ChangeEvent, useState } from 'react'

import { api } from '../libs/axios'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface GetAttendeesResponse {
	attendees: {
		id: number
		name: string
		email: string
		createdAt: string
		checkedInAt: string | null
	}[]
	total: number
}

export function AttendeeList() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)

	const { data, isLoading } = useQuery({
		queryKey: ['get-attendees', page],
		queryFn: async () => {
			const response = await api.get<GetAttendeesResponse>(
				`http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees?pageIndex=${
					page - 1
				}`,
			)

			return response.data
		},
		placeholderData: keepPreviousData,
	})

	const totalPages = Math.ceil((data?.total ?? 0) / 10)

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

			{!isLoading ? (
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
						{data?.attendees.map((attendee) => {
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
									<TableCell>
										{!attendee.checkedInAt ? (
											<span className="text-zinc-500">Não fez check-in</span>
										) : (
											dayjs().to(attendee.checkedInAt)
										)}
									</TableCell>
									<TableCell>
										<IconButton transparent>
											<MoreHorizontalIcon className="size-4" />
										</IconButton>
									</TableCell>
								</TableRow>
							)
						})}
					</tbody>
					{data?.attendees && (
						<tfoot>
							<tr>
								<TableCell colSpan={3}>
									Mostrando {data.attendees.length} de {data.total} itens
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
											<IconButton
												onClick={goToPreviousPage}
												disabled={page === 1}
											>
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
					)}
				</Table>
			) : (
				<p className="text-center">
					<Loader2Icon className="h-5 w-5 animate-spin" /> Carregando
					participantes
				</p>
			)}
		</div>
	)
}
