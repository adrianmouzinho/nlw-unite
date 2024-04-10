import { keepPreviousData, useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Loader2Icon, MoreHorizontalIcon } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { api } from '../libs/axios'
import { Pagination } from './pagination'
import { SearchInput } from './search-input'
import { IconButton } from './ui/icon-button'
import { Table } from './ui/table/table'
import { TableCell } from './ui/table/table-cell'
import { TableHeader } from './ui/table/table-header'
import { TableRow } from './ui/table/table-row'

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

type Params = {
	eventId: string
}

export function AttendeeList() {
	const { eventId } = useParams<Params>()

	const [searchParams, setSearchParams] = useSearchParams()

	const [filter, setFilter] = useState(() => {
		return searchParams.get('query') ?? ''
	})

	const page = Number(searchParams.get('page') ?? 1)

	const { data, isLoading, isError } = useQuery({
		queryKey: ['get-attendees', page, filter, eventId],
		queryFn: async () => {
			const response = await api.get<GetAttendeesResponse>(
				`/events/${eventId}/attendees`,
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
				<SearchInput
					value={filter}
					onChange={onSearchInputChanged}
					placeholder="Buscar participantes..."
				/>
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
					{isLoading && !data && (
						<TableRow>
							<TableCell
								colSpan={6}
								className="py-10 text-center text-zinc-500"
							>
								<p className="flex items-center gap-2 text-center justify-center">
									<Loader2Icon className="h-5 w-5 animate-spin" /> Carregando participantes
								</p>
							</TableCell>
						</TableRow>
					)}

					{data && data.attendees.length === 0 && (
						<TableRow>
							<TableCell
								colSpan={6}
								className="py-10 text-center text-zinc-500"
							>
								Nenhum resultado encontrado.
							</TableCell>
						</TableRow>
					)}

					{data && data.attendees.map((attendee) => {
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

					{!isLoading && isError && (
						<TableRow>
							<TableCell
								colSpan={6}
								className="py-10 text-center text-zinc-500"
							>
								Não foi possível carregar os participantes desse evento.
							</TableCell>
						</TableRow>
					)}
				</tbody>
				{data && data.attendees.length > 0 && (
					<Pagination
						page={page}
						totalPages={totalPages}
						itemsPerPage={data.attendees.length}
						totalItems={data.total}
					/>
				)}
			</Table>
		</div>
	)
}
