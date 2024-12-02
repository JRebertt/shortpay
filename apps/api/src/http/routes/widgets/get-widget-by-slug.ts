import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function getWidgetBySlug(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/widgets/:widgetSlug',
    {
      schema: {
        tags: ['Widget'],
        summary: 'Obtém um widget pelo slug',
        params: z.object({
          widgetSlug: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            description: z.string().nullable(),
            amount: z.number(),
            type: z.enum(['EMBED', 'SHAREABLE']),
          }),
        },
      },
    },
    async (request, reply) => {
      const { widgetSlug } = request.params

      // Busca o widget no banco
      const widget = await prisma.widget.findUnique({
        where: { widgetSlug },
      })

      if (!widget) {
        throw new Error('Widget não encontrado.')
      }

      return reply.send(widget)
    },
  )
}
