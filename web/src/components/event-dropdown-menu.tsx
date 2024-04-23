import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PencilIcon, Trash2Icon, UsersRoundIcon } from 'lucide-react'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

import { api } from '../libs/axios'
import { EditEventForm } from './edit-event-form'
import { Button } from './ui/button'

interface EventDropdownMenuProps {
	eventId: string
}

export function EventDropdownMenu({ eventId }: EventDropdownMenuProps) {
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: async (eventId: string) => {
			await api.delete(`/events/${eventId}`)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-events'],
			})
		},
	})

	async function deleteEvent() {
		await mutateAsync(eventId)

		toast.success('Evento deletado com sucesso!')
	}

	return (
		<DropdownMenu.Portal>
			<DropdownMenu.Content
				className="bg-zinc-950 border border-white/10 rounded-lg p-1 text-sm"
				sideOffset={6}
			>
				<Link to={`/events/${eventId}/attendees`}>
					<DropdownMenu.Item className="flex items-center gap-1.5 py-1.5 px-2 rounded outline-none hover:bg-white/10 transition-colors">
						<UsersRoundIcon className="size-3" />
						Participantes
					</DropdownMenu.Item>
				</Link>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<DropdownMenu.Item
							onSelect={(e) => e.preventDefault()}
							className="flex items-center gap-1.5 py-1.5 px-2 rounded outline-none hover:bg-white/10 transition-colors"
						>
							<PencilIcon className="size-3" />
							Editar evento
						</DropdownMenu.Item>
					</Dialog.Trigger>

					<Dialog.Portal>
						<Dialog.Overlay className="fixed inset-0 bg-black/70" />
						<Dialog.Content className="fixed space-y-10 p-10 right-0 top-0 bottom-0 h-screen max-w-sm z-10 bg-zinc-950 border-l border-zinc-900">
							<div className="space-y-3">
								<Dialog.Title className="text-xl font-bold">
									Editar evento
								</Dialog.Title>
								<Dialog.Description className="text-sm text-zinc-500">
									Faça alterações nesse evento aqui. Clique em salvar quando
									terminar.
								</Dialog.Description>
							</div>

							<EditEventForm eventId={eventId} />
						</Dialog.Content>
					</Dialog.Portal>
				</Dialog.Root>

				<AlertDialog.Root>
					<AlertDialog.Trigger asChild>
						<DropdownMenu.Item
							onSelect={(e) => e.preventDefault()}
							className="flex items-center gap-1.5 py-1.5 px-2 rounded outline-none hover:bg-white/10 transition-colors text-red-400"
						>
							<Trash2Icon className="size-3" />
							Deletar evento
						</DropdownMenu.Item>
					</AlertDialog.Trigger>

					<AlertDialog.Portal>
						<AlertDialog.Overlay className="inset-0 fixed bg-black/50" />
						<AlertDialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg w-full md:max-h-[60vh] bg-zinc-950 md:rounded-lg p-6 outline-none border border-white/10">
							<AlertDialog.Title className="text-lg font-semibold mb-2">
								Você tem certeza absoluta?
							</AlertDialog.Title>
							<AlertDialog.Description className="text-sm text-zinc-300 mb-4">
								Essa ação não pode ser desfeita. Isso vai deletar
								permanentemente esse evento e remover seus dados do servidor.
							</AlertDialog.Description>
							<div className="flex justify-end gap-2">
								<AlertDialog.Cancel asChild>
									<Button>Cancelar</Button>
								</AlertDialog.Cancel>
								<AlertDialog.Action asChild>
									<Button primary onClick={deleteEvent}>
										Sim, deletar evento
									</Button>
								</AlertDialog.Action>
							</div>
						</AlertDialog.Content>
					</AlertDialog.Portal>
				</AlertDialog.Root>
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	)
}
