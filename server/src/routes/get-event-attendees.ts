import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../libs/prisma'

export async function getEventAttendees(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get(
		'/events/:eventId/attendees',
		{
			schema: {
				params: z.object({
					eventId: z.string().uuid(),
				}),
				querystring: z.object({
					query: z.string().nullish(),
					pageIndex: z.string().nullish().default('0').transform(Number),
				}),
				response: {
					200: z.object({
						attendees: z.array(
							z.object({
								id: z.number().int(),
								name: z.string(),
								email: z.string().email(),
								createdAt: z.date(),
								checkInAt: z.date().nullable(),
							}),
						),
					}),
				},
			},
		},
		async (request, reply) => {
			const { eventId } = request.params
			const { pageIndex, query } = request.query

			console.log({ query })

			const [event, attendees] = await Promise.all([
				prisma.event.findUnique({
					where: {
						id: eventId,
					},
				}),

				prisma.attendee.findMany({
					select: {
						id: true,
						name: true,
						email: true,
						createdAt: true,
						checkIn: {
							select: {
								createdAt: true,
							},
						},
					},
					where: query
						? {
								eventId,
								name: {
									contains: query,
									mode: 'insensitive',
								},
							}
						: {
								eventId,
							},
					take: 10,
					skip: pageIndex * 10,
					orderBy: {
						createdAt: 'desc',
					},
				}),
			])

			if (!event) {
				reply.status(400)
				throw new Error('Event not found.')
			}

			return reply.status(200).send({
				attendees: attendees.map((attendee) => {
					return {
						id: attendee.id,
						name: attendee.name,
						email: attendee.email,
						createdAt: attendee.createdAt,
						checkInAt: attendee.checkIn?.createdAt ?? null,
					}
				}),
			})
		},
	)
}
