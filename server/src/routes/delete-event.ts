import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'
import { BadRequest } from './_errors/bad-request'

export async function deleteEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().delete(
		'/events/:eventId',
		{
			schema: {
				summary: 'Delete an event',
				tags: ['events'],
				params: z.object({
					eventId: z.string().uuid(),
				}),
				response: {
					204: z.null(),
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
				},
			})

			if (!event) {
				throw new BadRequest('Event not found.')
			}

			await prisma.event.delete({
				where: {
					id: eventId,
				},
			})

			return reply.status(204).send()
		},
	)
}
