import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Check, Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '../libs/axios'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { TextArea } from './ui/text-area'

const createEventSchema = z.object({
	title: z
		.string()
		.min(3, { message: 'O título precisa ter no mínimo 4 caracteres.' }),
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

type CreateEventSchema = z.infer<typeof createEventSchema>

export function CreateEventForm() {
	const queryClient = useQueryClient()

	const { register, handleSubmit, formState } = useForm<CreateEventSchema>({
		resolver: zodResolver(createEventSchema),
		defaultValues: {
			details: null,
			maximumAttendees: null,
		},
	})

	const { mutateAsync } = useMutation({
		mutationFn: async ({
			title,
			details,
			maximumAttendees,
		}: CreateEventSchema) => {
			await api.post('/events', {
				title,
				details,
				maximumAttendees,
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['get-events'],
			})
		},
	})

	async function createEvent({
		title,
		details,
		maximumAttendees,
	}: CreateEventSchema) {
		await mutateAsync({ title, details, maximumAttendees })

		toast.success('Evento criado com sucesso!')
	}

	return (
		<form onSubmit={handleSubmit(createEvent)} className="w-full space-y-6">
			<div className="space-y-2">
				<Label htmlFor="title">Título</Label>
				<Input {...register('title')} id="title" />
				{formState.errors?.title && (
					<p className="text-sm text-red-400">
						{formState.errors.title.message}
					</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="maximumAttendees">
					Número de participantes (opcional)
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
				<Label htmlFor="details">Detalhes (opcional)</Label>
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
				<Button type="submit" primary disabled={formState.isSubmitting}>
					{formState.isSubmitting ? (
						<Loader2 className="size-3 animate-spin" />
					) : (
						<Check className="size-3" />
					)}
					Salvar
				</Button>
			</div>
		</form>
	)
}
