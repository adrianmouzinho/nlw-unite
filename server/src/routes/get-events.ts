import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '../libs/prisma'

export async function getEvents(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events',
		{
			schema: {
				summary: 'Get all events',
				tags: ['events'],
				querystring: z.object({
					query: z.string().nullish(),
					pageIndex: z.string().nullish().default('0').transform(Number),
				}),
				response: {
					200: z.object({
						events: z.array(
							z.object({
								id: z.string().uuid(),
								title: z.string(),
								details: z.string().nullable(),
								slug: z.string(),
								maximumAttendees: z.number().int().nullable(),
								attendeesAmount: z.number().int(),
							}),
						),
						total: z.number(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { pageIndex, query } = request.query

			const [events, total] = await Promise.all([
				prisma.event.findMany({
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
					where: query
						? {
								title: {
									contains: query,
									mode: 'insensitive',
								},
							}
						: {},
					take: 10,
					skip: pageIndex * 10,
				}),

				prisma.event.count({
					where: query
						? {
								title: {
									contains: query,
									mode: 'insensitive',
								},
							}
						: {},
				}),
			])

			return reply.status(200).send({
				events: events.map((event) => {
					return {
						id: event.id,
						title: event.title,
						details: event.details,
						slug: event.slug,
						maximumAttendees: event.maximumAttendees,
						attendeesAmount: event._count.attendees,
					}
				}),
				total,
			})
		},
	)
}
