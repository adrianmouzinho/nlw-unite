import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'
import { generateSlug } from '../utils/generate-slug'
import { BadRequest } from './_errors/bad-request'

export async function createEvent(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/events',
		{
			schema: {
				summary: 'Create an event',
				tags: ['events'],
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
					201: z.object({
						eventId: z.string().uuid(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { title, details, maximumAttendees } = request.body

			const slug = generateSlug(title)

			const eventWithSameSlug = await prisma.event.findUnique({
				where: {
					slug,
				},
			})

			if (eventWithSameSlug !== null) {
				throw new BadRequest('Another event with same title already exists.')
			}

			const event = await prisma.event.create({
				data: {
					title,
					details,
					slug,
					maximumAttendees,
				},
				select: {
					id: true,
				},
			})

			return reply.status(201).send({ eventId: event.id })
		},
	)
}
