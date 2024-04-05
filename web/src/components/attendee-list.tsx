import { keepPreviousData, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Loader2Icon, MoreHorizontalIcon, SearchIcon } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { api } from '../libs/axios'
import { IconButton } from './icon-button'
import { Pagination } from './pagination'
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
	const [searchParams, setSearchParams] = useSearchParams()

	const [filter, setFilter] = useState(() => {
		return searchParams.get('query') ?? ''
	})

	const page = Number(searchParams.get('page') ?? 1)

	const { data, isLoading } = useQuery({
		queryKey: ['get-attendees', page, filter],
		queryFn: async () => {
			const response = await api.get<GetAttendeesResponse>(
				'/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees',
				{ params: { pageIndex: page - 1, query: filter } },
			)

			return response.data
		},
		placeholderData: keepPreviousData,
	})

	const totalPages = Math.ceil((data?.total ?? 0) / 10)

	function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
		setFilter(event.target.value)

		setSearchParams((params) => {
			params.set('page', '1')
			params.set('query', event.target.value)

			return params
		})
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
						value={filter}
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
										{attendee.checkedInAt === null ? (
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
						<Pagination
							page={page}
							totalPages={totalPages}
							itemsPerPage={data.attendees.length}
							totalItems={data.total}
						/>
					)}
				</Table>
			) : (
				<p className="flex items-center gap-2 text-center justify-center">
					<Loader2Icon className="h-5 w-5 animate-spin" /> Carregando
					participantes
				</p>
			)}
		</div>
	)
}
