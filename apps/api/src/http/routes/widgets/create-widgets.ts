import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'
import { BadRequestError } from '@/http/routes/_error/bad-request-error'
import { NotFoundError } from '@/http/routes/_error/not-found-error'
import { prisma } from '@/lib/prisma'
import { createSlug } from '@/utils/create-slug'

export async function createWidget(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/widgets',
      {
        schema: {
          tags: ['Widget'],
          summary: 'Cadastra um novo widget para uma organização.',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string().min(1, 'O nome do widget é obrigatório.'),
            amount: z.number().min(1, 'O valor deve ser maior que zero.'),
            description: z.string().nullable(),
            integrationId: z.string().min(1, 'ID da integração é obrigatório.'), // Removido UUID
            productId: z.string().min(1, 'ID do produto é obrigatório.'), // Removido UUID
            type: z.enum(['EMBED', 'SHAREABLE']).default('EMBED'),
            widgetSlug: z.string().optional(),
          }),
          params: z.object({
            slug: z.string().min(1, 'O slug da organização é obrigatório.'),
          }),
          response: {
            201: z.object({
              id: z.string(), // Não validando como UUID
              name: z.string(),
              amount: z.number(),
              description: z.string().nullable(),
              integrationId: z.string(),
              productId: z.string(),
              type: z.enum(['EMBED', 'SHAREABLE']),
              widgetSlug: z.string().nullable(),
              createdAt: z.coerce.date(),
              updatedAt: z.coerce.date(),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { slug } = request.params
        const {
          name,
          amount,
          description,
          integrationId,
          productId,
          type,
          widgetSlug: customWidgetSlug,
        } = request.body

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

        const integration = await prisma.integration.findFirst({
          where: {
            id: integrationId,
            organizationId: organization.id,
          },
        })

        if (!integration) {
          throw new BadRequestError(
            'Integração inválida para esta organização.',
          )
        }

        const product = await prisma.product.findFirst({
          where: {
            id: productId,
            organizationId: organization.id,
          },
        })

        if (!product) {
          throw new BadRequestError('Produto inválido para esta organização.')
        }

        const widgetSlug =
          type === 'SHAREABLE' ? customWidgetSlug || createSlug(name) : null

        if (type === 'SHAREABLE') {
          if (!widgetSlug) {
            throw new BadRequestError(
              'Slug é obrigatório para widgets do tipo SHAREABLE.',
            )
          }

          const existingWidget = await prisma.widget.findFirst({
            where: {
              widgetSlug,
              organizationId: organization.id,
            },
          })

          if (existingWidget) {
            throw new BadRequestError('Já existe um widget com este slug.')
          }
        }

        const widget = await prisma.widget.create({
          data: {
            name,
            amount,
            description,
            type,
            widgetSlug,
            organizationId: organization.id,
            integrationId,
            productId,
          },
        })

        // Validação para garantir que o ID retornado não esteja vazio
        if (!widget.id || typeof widget.id !== 'string') {
          throw new BadRequestError('Erro ao criar widget. ID inválido.')
        }

        return reply.status(201).send(widget)
      },
    )
}
