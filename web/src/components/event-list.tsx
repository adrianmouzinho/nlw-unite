import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Loader2Icon, MoreHorizontalIcon, PlusIcon } from 'lucide-react'
import { type ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { api } from '../libs/axios'
import { CreateEventForm } from './create-event-form'
import { EventDropdownMenu } from './event-dropdown-menu'
import { Pagination } from './pagination'
import { SearchInput } from './search-input'
import { Button } from './ui/button'
import { IconButton } from './ui/icon-button'
import { Table } from './ui/table/table'
import { TableCell } from './ui/table/table-cell'
import { TableHeader } from './ui/table/table-header'
import { TableRow } from './ui/table/table-row'

interface GetEventsResponse {
	events: {
		id: number
		title: string
		details: string | null
		slug: string
		maximumAttendees: number | null
		attendeesAmount: number
	}[]
	total: number
}

export function EventList() {
	const [searchParams, setSearchParams] = useSearchParams()

	const [filter, setFilter] = useState(() => {
		return searchParams.get('query') ?? ''
	})

	const page = Number(searchParams.get('page') ?? 1)

	const { data, isLoading } = useQuery({
		queryKey: ['get-events', page, filter],
		queryFn: async () => {
			const response = await api.get<GetEventsResponse>('/events', {
				params: { pageIndex: page - 1, query: filter },
			})

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
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl leading-snug font-bold">Eventos</h1>
					<SearchInput
						value={filter}
						onChange={onSearchInputChanged}
						placeholder="Buscar eventos..."
					/>
				</div>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<Button primary>
							<PlusIcon className="size-3" />
							Novo evento
						</Button>
					</Dialog.Trigger>

					<Dialog.Portal>
						<Dialog.Overlay className="fixed inset-0 bg-black/70" />
						<Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen min-w-[320px] z-10 bg-zinc-950 border-l border-zinc-900">
							<div className="space-y-3">
								<Dialog.Title className="text-xl font-bold">
									Criar evento
								</Dialog.Title>
								<Dialog.Description className="text-sm text-zinc-500">
									Após criar um evento, você poderá cadastrar novos
									participantes.
								</Dialog.Description>
							</div>

							<CreateEventForm />
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>
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
							<TableHeader>Título</TableHeader>
							<TableHeader>Detalhes</TableHeader>
							<TableHeader>N° máximo de participantes</TableHeader>
							<TableHeader>N° de inscritos</TableHeader>
							<TableHeader className="w-16"></TableHeader>
						</TableRow>
					</thead>
					<tbody>
						{data?.events.map((event) => {
							return (
								<TableRow key={event.id}>
									<TableCell>
										<input
											type="checkbox"
											className="size-4 bg-black/20 rounded border border-white/10 text-orange-400 focus:ring-orange-400"
										/>
									</TableCell>
									<TableCell>
										<div className="flex flex-col gap-1">
											<span className="text-zinc-50 font-semibold truncate">
												{event.title}
											</span>
											<span className="text-xs">{event.id}</span>
										</div>
									</TableCell>
									<TableCell className="truncate">
										{!event.details ? (
											<span className="text-zinc-500">Sem detalhes</span>
										) : (
											event.details
										)}
									</TableCell>
									<TableCell>
										{!event.maximumAttendees
											? 'Sem limite'
											: event.maximumAttendees}
									</TableCell>
									<TableCell>{event.attendeesAmount}</TableCell>
									<TableCell>
										<DropdownMenu.Root>
											<DropdownMenu.Trigger asChild>
												<IconButton transparent>
													<MoreHorizontalIcon className="size-4" />
												</IconButton>
											</DropdownMenu.Trigger>

											<EventDropdownMenu eventId={event.id} />
										</DropdownMenu.Root>
									</TableCell>
								</TableRow>
							)
						})}
					</tbody>
					{data?.events && (
						<Pagination
							page={page}
							totalPages={totalPages}
							itemsPerPage={data.events.length}
							totalItems={data.total}
						/>
					)}
				</Table>
			) : (
				<p className="flex items-center gap-2 text-center justify-center">
					<Loader2Icon className="h-5 w-5 animate-spin" /> Carregando eventos
				</p>
			)}
		</div>
	)
}
