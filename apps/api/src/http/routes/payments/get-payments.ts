import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_error/bad-request-error'

export async function getPlans(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/plans',
    {
      schema: {
        tags: ['Plans'],
        summary: 'Fetch all available plans',
        response: {
          200: z.array(
            z.object({
              id: z.string().cuid(),
              name: z.string(),
              price: z.number(),
              duration: z.number(),
              description: z.string().nullable(),
            }),
          ),
        },
      },
    },
    async (_request, reply) => {
      // Buscar todos os planos no banco de dados
      const plans = await prisma.plan.findMany()

      // Verificar se há planos cadastrados
      if (!plans || plans.length === 0) {
        throw new BadRequestError('No plans found.')
      }

      // Retornar os planos encontrados
      return reply.status(200).send(plans)
    },
  )
}
