import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { prisma } from '../libs/prisma'

export async function checkIn(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/attendees/:attendeeId/check-in',
		{
			schema: {
				summary: 'Check-in an attendee',
				tags: ['check-ins'],
				params: z.object({
					attendeeId: z.coerce.number().int(),
				}),
				response: {
					201: z.null(),
				},
			},
		},
		async (request, reply) => {
			const { attendeeId } = request.params

			const [attendee, attendeeCheckIn] = await Promise.all([
				prisma.attendee.findUnique({
					where: {
						id: attendeeId,
					},
				}),

				prisma.checkIn.findUnique({
					where: {
						attendeeId,
					},
				}),
			])

			if (!attendee) {
				reply.status(400)
				throw new Error('Attendee not found.')
			}

			if (attendeeCheckIn !== null) {
				reply.status(400)
				throw new Error('Attendee has already checked in.')
			}

			await prisma.checkIn.create({
				data: {
					attendeeId,
				},
			})

			return reply.status(201).send()
		},
	)
}
