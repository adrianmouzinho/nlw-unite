import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, Loader2, Loader2Icon, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '../libs/axios'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { TextArea } from './ui/text-area'

const editEventSchema = z.object({
	title: z
		.string()
		.min(4, { message: 'O título precisa ter no mínimo 4 caracteres.' }),
	details: z.string().nullable().default(null),
	maximumAttendees: z.coerce
		.number()
		.int({
			message: 'O número de participantes precisa ser um valor inteiro.',
		})
		.positive({
			message: 'O número de participantes precisa ser um valor maior que 0.',
		})
		.nullable()
		.default(null),
})

type EditEventSchema = z.infer<typeof editEventSchema>

interface GetEventResponse {
	event: {
		id: string
		title: string
		details: string | null
		slug: string
		maximumAttendees: number | null
		attendeesAmount: number
	}
}

interface EditEventFormProps {
	eventId: string
}

export function EditEventForm({ eventId }: EditEventFormProps) {
	const queryClient = useQueryClient()

	const { isLoading, isError } = useQuery({
		queryKey: ['get-event', eventId],
		queryFn: async () => {
			const response = await api.get<GetEventResponse>(`/events/${eventId}`)

			const { title, details, maximumAttendees } = response.data.event

			setValue('title', title)
			setValue('details', details)
			setValue('maximumAttendees', maximumAttendees)

			return response.data
		},
	})

	const { register, handleSubmit, formState, setValue } =
		useForm<EditEventSchema>({
			resolver: zodResolver(editEventSchema),
		})

	const { mutateAsync } = useMutation({
		mutationFn: async ({
			eventId,
			title,
			details,
			maximumAttendees,
		}: EditEventSchema & { eventId: string }) => {
			await api.put(`/events/${eventId}`, {
				title,
				details,
				maximumAttendees,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-events'],
			})

			toast.success('Evento editado com sucesso!')
		},
		onError: () => {
			toast.error('Ops! Não foi possível editar o evento, verifique se você informou todos os campos corretamente!', { duration: 6000 })
		}
	})

	async function createEvent({
		title,
		details,
		maximumAttendees,
	}: EditEventSchema) {
		await mutateAsync({ eventId, title, details, maximumAttendees })
	}

	return (
		<form onSubmit={handleSubmit(createEvent)} className="w-full space-y-6">
			<div className="space-y-2">
				<Label htmlFor="title">
					Título {isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
				</Label>
				<Input {...register('title')} id="title" />
				{formState.errors?.title && (
					<p className="text-sm text-red-400">
						{formState.errors.title.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="maximumAttendees">
					Número de participantes (opcional){' '}
					{isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
				</Label>
				<Input
					{...register('maximumAttendees')}
					id="maximumAttendees"
					type="number"
				/>
				{formState.errors?.maximumAttendees && (
					<p className="text-sm text-red-400">
						{formState.errors?.maximumAttendees.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="details">
					Detalhes (opcional){' '}
					{isLoading && <Loader2Icon className="h-5 w-5 animate-spin" />}
				</Label>
				<TextArea
					{...register('details')}
					id="details"
					spellCheck={false}
					rows={3}
				></TextArea>
			</div>

			<div className="flex items-center justify-end gap-2">
				<Dialog.Close asChild>
					<Button>
						<X className="size-3" />
						Cancelar
					</Button>
				</Dialog.Close>
				<Button type="submit" primary disabled={isLoading || isError || formState.isSubmitting}>
					{formState.isSubmitting ? (
						<Loader2 className="size-3 animate-spin" />
					) : (
						<Check className="size-3" />
					)}
					Editar
				</Button>
			</div>
		</form>
	)
}
