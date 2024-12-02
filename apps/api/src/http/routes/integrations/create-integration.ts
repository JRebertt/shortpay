import { env } from '@shortpay/env'
import { PaymentGatewayFactory } from '@shortpay/gateways'
import { aesEncrypt } from '@shortpay/utils/aes-encryption'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middleware/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_error/bad-request-error'

export async function createIntegration(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/connect-gateway',
      {
        schema: {
          tags: ['Integration'],
          summary:
            'Configura e valida uma integração de gateway de pagamento para uma organização',
          security: [{ bearerAuth: [] }],
          body: z.object({
            provider: z.string(),
            secretKey: z.string().min(1),
            apiKey: z.string().default('x'),
            publicKey: z.string().nullable(),
            webhookSecret: z.string().nullable(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              integration: z.object({
                provider: z.string(),
                isActive: z.boolean(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { slug } = request.params
        // const userId = await request.getCurrentUserId()
        const { provider, secretKey, publicKey, webhookSecret, apiKey } =
          request.body

        const { organization } = await request.getUserMembership(slug)

        // Verificar se o usuário tem permissão para criar integrações nesta organização
        // const member = await prisma.member.findUnique({
        //   where: {
        //     organizationId_userId: {
        //       organizationId,
        //       userId,
        //     },
        //   },
        // })

        // if (!member) {
        //   throw new Error('User is not a member of this organization')
        // }

        const availableGateway = await prisma.availableGateway.findUnique({
          where: { provider },
        })

        if (!availableGateway) {
          throw new BadRequestError('Gateway não encontrado.')
        }

        // Verifica se a integração já está configurada
        const existingIntegration = await prisma.integration.findFirst({
          where: {
            provider,
            organizationId: organization.id,
          },
        })

        if (existingIntegration) {
          throw new BadRequestError(
            'Este gateway já está configurado para esta organização.',
          )
        }

        // Usa a PaymentGatewayFactory para criar a instância do gateway correto
        let gateway
        try {
          gateway = PaymentGatewayFactory.createGateway(
            provider,
            secretKey,
            apiKey,
          )
        } catch (error) {
          if (error instanceof Error) {
            throw new BadRequestError(error.message)
          }
          throw new BadRequestError(
            'Ocorreu um erro inesperado ao criar o gateway.',
          )
        }

        // Valida as credenciais do gateway usando o método `getCompany`
        try {
          const companyData = await gateway.getCompany()
          if (companyData.blocked) {
            throw new BadRequestError(
              'A conta vinculada ao gateway está bloqueada.',
            )
          }
        } catch (error) {
          if (error instanceof Error) {
            throw new BadRequestError(
              `Erro ao validar as credenciais do gateway: ${error.message}`,
            )
          }
          throw new BadRequestError(
            'Erro desconhecido ao validar as credenciais do gateway.',
          )
        }

        // Criptografa a chave secreta antes de salvar
        const encryptionKey = env.AES_ENCRYPTION_KEY!
        const { ciphertext, iv } = await aesEncrypt(secretKey, encryptionKey)

        // Cria a integração no banco de dados
        const savedIntegration = await prisma.integration.create({
          data: {
            provider,
            apiKey,
            publicKey,
            ciphertext,
            iv,
            webhookSecret,
            isActive: true,
            organizationId: organization.id,
            availableGatewayId: availableGateway.id,
            status: 'connected',
            secretKey: '',
          },
        })

        return reply.status(201).send({ integration: savedIntegration })
      },
    )
}
