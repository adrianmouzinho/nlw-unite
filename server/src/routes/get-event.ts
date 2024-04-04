import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'

export async function getEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events/:eventId',
		{
			schema: {
				summary: 'Get an event',
				tags: ['events'],
				params: z.object({
					eventId: z.string().uuid(),
				}),
				response: {
					200: z.object({
						event: z.object({
							id: z.string().uuid(),
							title: z.string(),
							details: z.string().nullable(),
							slug: z.string(),
							maximumAttendees: z.number().int().nullable(),
							attendeesAmount: z.number().int(),
						}),
					}),
				},
			},
		},
		async (request, reply) => {
			const { eventId } = request.params

			const event = await prisma.event.findUnique({
				where: {
					id: eventId,
				},
				select: {
					id: true,
					title: true,
					details: true,
					slug: true,
					maximumAttendees: true,
					_count: {
						select: {
							attendees: true,
						},
					},
				},
			})

			if (!event) {
				reply.status(400)
				throw new Error('Event not found.')
			}

			const { id, title, details, slug, maximumAttendees, _count } = event

			return reply.status(200).send({
				event: {
					id,
					title,
					details,
					slug,
					maximumAttendees,
					attendeesAmount: _count.attendees,
				},
			})
		},
	)
}
