import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_error/bad-request-error'

export async function getProducts(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/products',
      {
        schema: {
          tags: ['Products'],
          summary: 'List products for an organization',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            organizationId: z.string().uuid(),
          }),
          response: {
            200: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                description: z.string().nullable(),
                price: z.number(),
                organizationId: z.string(),
              }),
            ),
          },
        },
      },
      async function (request, reply) {
        const userId = await request.getCurrentUserId()

        const { organizationId } = request.query

        const userMembership = await prisma.member.findFirst({
          where: {
            userId,
            organizationId,
            role: { in: ['ADMIN', 'MEMBER'] },
          },
        })

        if (!userMembership) {
          throw new BadRequestError(
            'You do not have permission to view products for this organization.',
          )
        }

        const products = await prisma.product.findMany({
          where: {
            organizationId,
          },
        })

        return reply.status(200).send(products)
      },
    )
}
