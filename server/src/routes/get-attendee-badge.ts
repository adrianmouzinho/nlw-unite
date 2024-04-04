import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'

export async function getAttendeeBadge(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/attendees/:attendeeId/badge',
		{
			schema: {
				summary: 'Get an attendee badge',
				tags: ['attendees'],
				params: z.object({
					attendeeId: z.coerce.number().int(),
				}),
				response: {
					200: z.object({
						badge: z.object({
							name: z.string(),
							email: z.string().email(),
							eventTitle: z.string(),
							checkInURL: z.string().url(),
						}),
					}),
				},
			},
		},
		async (request, reply) => {
			const { attendeeId } = request.params

			const attendee = await prisma.attendee.findUnique({
				where: {
					id: attendeeId,
				},
				select: {
					name: true,
					email: true,
					event: {
						select: {
							title: true,
						},
					},
				},
			})

			if (!attendee) {
				reply.status(400)
				throw new Error('Attendee not found.')
			}

			const baseURL = `${request.protocol}://${request.hostname}`

			const checkInURL = new URL(
				`/attendees/${attendeeId}/check-in`,
				baseURL,
			).toString()

			const {
				name,
				email,
				event: { title: eventTitle },
			} = attendee

			return reply
				.status(200)
				.send({ badge: { name, email, eventTitle, checkInURL } })
		},
	)
}
