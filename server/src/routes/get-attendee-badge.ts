import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'

export async function getAttendeeBadge(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/attendees/:attendeeId/badge',
		{
			schema: {
				params: z.object({
					attendeeId: z.coerce.number().int(),
				}),
				response: {
					200: z.object({
						attendee: z.object({
							id: z.number().int(),
							name: z.string(),
							email: z.string().email(),
							event: z.object({
								title: z.string(),
							}),
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
					id: true,
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

			return reply.status(200).send({ attendee })
		},
	)
}
