import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PencilIcon, Trash2Icon, UsersRoundIcon } from 'lucide-react'
import { toast } from 'sonner'

import { api } from '../libs/axios'
import { Button } from './ui/button'

interface EventDropdownMenuProps {
	eventId: number
}

export function EventDropdownMenu({ eventId }: EventDropdownMenuProps) {
	const queryClient = useQueryClient()

	const { mutateAsync } = useMutation({
		mutationFn: async (eventId: number) => {
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
				<DropdownMenu.Item className="flex items-center gap-1.5 py-1.5 px-2 rounded outline-none hover:bg-white/10 transition-colors">
					<UsersRoundIcon className="size-3" />
					Ver participantes
				</DropdownMenu.Item>
				<DropdownMenu.Item className="flex items-center gap-1.5 py-1.5 px-2 rounded outline-none hover:bg-white/10 transition-colors">
					<PencilIcon className="size-3" />
					Editar evento
				</DropdownMenu.Item>

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
