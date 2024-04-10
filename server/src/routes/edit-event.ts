import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'
import { generateSlug } from '../utils/generate-slug'
import { BadRequest } from './_errors/bad-request'

export async function editEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().put(
		'/events/:eventId',
		{
			schema: {
				summary: 'Edit an event',
				tags: ['events'],
				params: z.object({
					eventId: z.string().uuid(),
				}),
				body: z.object({
					title: z.string().min(4),
					details: z.string().nullable().default(null),
					maximumAttendees: z
						.number()
						.int()
						.positive()
						.nullable()
						.default(null),
				}),
				response: {
					200: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { eventId } = request.params
			const { title, details, maximumAttendees } = request.body

			const slug = generateSlug(title)

			const [event, eventWithSameSlug] = await Promise.all([
				prisma.event.findUnique({
					select: {
						id: true,
						slug: true,
						_count: {
							select: {
								attendees: true,
							},
						},
					},
					where: {
						id: eventId,
					},
				}),

				prisma.event.findUnique({
					select: {
						id: true,
					},
					where: {
						slug,
					},
				}),
			])

			if (!event) {
				throw new BadRequest('Event not found.')
			}

			if (eventWithSameSlug && eventWithSameSlug.id !== event.id) {
				throw new BadRequest('Another event with same title already exists.')
			}

			if (maximumAttendees && maximumAttendees <= event._count.attendees) {
				throw new BadRequest(
					'The maximum number of attendees for this event must be greater than the number of registered attendees.',
				)
			}

			await prisma.event.update({
				select: {
					id: true,
				},
				where: {
					id: eventId,
				},
				data: {
					title,
					details,
					slug,
					maximumAttendees,
				},
			})

			return reply.status(200).send()
		},
	)
}
