import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_error/bad-request-error'

export async function createProduct(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/products',
      {
        schema: {
          tags: ['Products'],
          summary: 'Create a new product',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string().optional(),
            price: z.number().positive(),
            slug: z.string(),
          }),
          response: {
            201: z.object({
              productId: z.string(),
            }),
          },
        },
      },
      async function (request, reply) {
        const userId = await request.getCurrentUserId()

        const { name, description, price, slug } = request.body

        // Encontrar a organização pelo slug
        const organization = await prisma.organization.findUnique({
          where: { slug },
        })

        if (!organization) {
          throw new BadRequestError('Organization not found.')
        }

        // Verificar se o usuário pertence à organização
        const userMembership = await prisma.member.findFirst({
          where: {
            userId,
            organizationId: organization.id,
            role: { in: ['ADMIN', 'MEMBER'] },
          },
        })

        if (!userMembership) {
          throw new BadRequestError(
            'You do not have permission to create products for this organization.',
          )
        }

        // Criar o produto
        const product = await prisma.product.create({
          data: {
            name,
            description,
            price,
            organizationId: organization.id,
          },
        })

        return reply.status(201).send({
          productId: product.id,
        })
      },
    )
}
