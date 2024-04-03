import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'

export async function registerForEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/events/:eventId/register',
		{
			schema: {
				body: z.object({
					name: z.string().min(4),
					email: z.string().email(),
				}),
				params: z.object({
					eventId: z.string().uuid(),
				}),
				response: {
					201: z.object({
						attendeeId: z.number(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { eventId } = request.params

			const [event, amountOfAttendeesForEvent] = await Promise.all([
				prisma.event.findUnique({
					where: {
						id: eventId,
					},
					select: {
						maximumAttendees: true,
					},
				}),

				prisma.attendee.count({
					where: {
						eventId,
					},
				}),
			])

			if (!event) {
				reply.status(400)
				throw new Error('Event not found.')
			}

			const { name, email } = request.body

			const attendeeFromEmail = await prisma.attendee.findUnique({
				where: {
					eventId_email: {
						email,
						eventId,
					},
				},
			})

			if (attendeeFromEmail !== null) {
				reply.status(400)
				throw new Error('This e-mail is already registered for this event.')
			}

			if (
				event.maximumAttendees !== null &&
				amountOfAttendeesForEvent >= event.maximumAttendees
			) {
				reply.status(400)
				throw new Error(
					'The maximum number of attendees for this event has been reached.',
				)
			}

			const attendee = await prisma.attendee.create({
				data: {
					name,
					email,
					eventId,
				},
				select: {
					id: true,
				},
			})

			return reply.status(201).send({ attendeeId: attendee.id })
		},
	)
}
