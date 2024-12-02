import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_error/bad-request-error'
import { NotFoundError } from '../_error/not-found-error'

export async function getProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/products/:productId',
      {
        schema: {
          tags: ['Products'],
          summary: 'Get a specific product by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            productId: z.string().uuid(),
          }),
          response: {
            200: z.object({
              id: z.string(),
              name: z.string(),
              description: z.string().nullable(),
              price: z.number(),
              organizationId: z.string(),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async function (request, reply) {
        const userId = await request.getCurrentUserId()

        const { productId } = request.params

        // Find the product
        const product = await prisma.product.findUnique({
          where: { id: productId },
        })

        if (!product) {
          throw new NotFoundError('Product not found.')
        }

        // Check user membership in the organization
        const userMembership = await prisma.member.findFirst({
          where: {
            userId,
            organizationId: product.organizationId,
            role: { in: ['ADMIN', 'MEMBER'] },
          },
        })

        if (!userMembership) {
          throw new BadRequestError(
            'You do not have permission to view this product.',
          )
        }

        return reply.status(200).send(product)
      },
    )
}
