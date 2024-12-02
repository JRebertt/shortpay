import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'
import { BadRequestError } from '@/http/routes/_error/bad-request-error'
import { NotFoundError } from '@/http/routes/_error/not-found-error'
import { prisma } from '@/lib/prisma'

export async function generatePaymentLink(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/widgets/:widgetId/payment-link',
      {
        schema: {
          tags: ['Widget'],
          summary: 'Gera um link de pagamento para um widget existente.',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string().min(1, 'O slug da organização é obrigatório.'),
            widgetId: z.string().min(1, 'ID de widget inválido.'),
          }),
          response: {
            200: z.object({
              link: z.string(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { slug, widgetId } = request.params

        const organization = await prisma.organization.findUnique({
          where: { slug },
          include: {
            members: {
              where: { userId },
            },
          },
        })

        if (!organization) {
          throw new NotFoundError('Organização não encontrada.')
        }

        if (organization.members.length === 0) {
          throw new BadRequestError('Usuário não é membro desta organização.')
        }

        const widget = await prisma.widget.findFirst({
          where: {
            id: widgetId,
            organizationId: organization.id,
          },
        })

        if (!widget) {
          throw new NotFoundError('Widget não encontrado.')
        }

        if (widget.type !== 'SHAREABLE') {
          throw new BadRequestError('Este widget não é do tipo compartilhável.')
        }

        if (!widget.widgetSlug) {
          throw new BadRequestError('Este widget não possui um slug válido.')
        }

        const baseUrl =
          process.env.PAYMENT_BASE_URL || 'http://pay.shortpay.cash'
        const link = `${baseUrl}/${organization.slug}/${widget.widgetSlug}`

        return reply.send({ link })
      },
    )
}
