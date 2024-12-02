import { IntegrationStatus } from '@prisma/client'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'

export async function getOrganizationIntegrations(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/integrations',
      {
        schema: {
          tags: ['Integrations'],
          summary:
            'Get all integrations for a specific organization, with filtering and search',
          params: z.object({
            slug: z.string().min(1),
          }),
          querystring: z.object({
            status: z.enum(['connected', 'disconnected']).optional(),
            name: z.string().optional(),
          }),
          response: {
            200: z.object({
              integrations: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  slug: z.string(),
                  provider: z.string(),
                  description: z.string().nullable(),
                  status: z.nativeEnum(IntegrationStatus),
                  icon: z.string().nullable(),
                  domain: z.string().nullable(),
                  integrationId: z.string().nullable(),
                }),
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        const { status, name } = request.query

        const integrations = await prisma.availableGateway.findMany({
          where: {
            OR: [
              { integrations: { some: { organization: { slug } } } },
              { integrations: { none: { organization: { slug } } } },
            ],
            ...(name && {
              name: { contains: name, mode: 'insensitive' },
            }),
          },
          include: {
            integrations: {
              where: { organization: { slug } },
              select: { id: true, status: true },
            },
          },
        })

        const processedIntegrations = integrations
          .map((gateway) => {
            const integration = gateway.integrations[0] || null
            return {
              id: gateway.id,
              name: gateway.name,
              slug: gateway.slug,
              provider: gateway.provider,
              description: gateway.description,
              status: integration?.status || 'disconnected',
              icon: gateway.icon,
              domain: gateway.domain,
              integrationId: integration?.id || null,
            }
          })
          .filter((integration) => !status || integration.status === status)

        return reply.send({ integrations: processedIntegrations })
      },
    )
}
