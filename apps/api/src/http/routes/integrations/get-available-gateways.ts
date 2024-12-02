import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'

export async function getAvailableGateways(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/available-gateways',
      {
        schema: {
          tags: ['AvailableGateways'],
          summary: 'Get all available gateways for integration',
          response: {
            200: z.object({
              gateways: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  slug: z.string(),
                  provider: z.string(),
                  description: z.string().nullable(),
                  icon: z.string().nullable(),
                  domain: z.string().nullable(),
                }),
              ),
            }),
          },
        },
      },
      async (_request, reply) => {
        const gateways = await prisma.availableGateway.findMany()

        return reply.send({ gateways })
      },
    )
}
