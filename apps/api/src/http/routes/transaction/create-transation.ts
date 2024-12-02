import { env } from '@shortpay/env'
import { PaymentGatewayFactory } from '@shortpay/gateways'
import { aesDecrypt } from '@shortpay/utils/aes-encryption'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { BadRequestError } from '@/http/routes/_error/bad-request-error'
import { NotFoundError } from '@/http/routes/_error/not-found-error'
import { prisma } from '@/lib/prisma'

// Updated interface to allow null values
interface PixPaymentResult {
  id: string
  pixCode: string | null
  qrCodeUrl: string | null
  expiresAt: Date
}

export async function createTransaction(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/widgets/:widgetSlug/transactions',
    {
      schema: {
        tags: ['Transaction'],
        summary: 'Gera uma transação PIX para um widget específico',
        params: z.object({
          widgetSlug: z.string().min(1, 'O slug do widget é obrigatório.'),
        }),
        body: z.object({
          customerName: z.string().min(1, 'O nome do cliente é obrigatório.'),
          customerEmail: z.string().email('Email inválido.'),
          customerPhone: z.string().min(10, 'Telefone inválido.'),
          customerDocument: z.string().min(11, 'CPF/CNPJ inválido.'),
          overrideAmount: z.number().positive().optional(),
        }),
        response: {
          201: z.object({
            transactionId: z.string().uuid(),
            amount: z.number(),
            currency: z.string(),
            status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
            pixCode: z.string().nullable(),
            qrCodeUrl: z.string().nullable(),
            expiresAt: z.coerce.date(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { widgetSlug } = request.params
      const {
        customerName,
        customerEmail,
        customerPhone,
        customerDocument,
        overrideAmount,
      } = request.body

      console.log(
        `Iniciando a criação da transação PIX para o widget: ${widgetSlug}`,
      )

      const widget = await prisma.widget.findFirst({
        where: { widgetSlug },
        include: {
          integration: true,
          organization: true,
        },
      })

      if (!widget || !widget.integration) {
        console.error(
          `Widget ou integração não encontrados para o widgetSlug: ${widgetSlug}`,
        )
        throw new NotFoundError('Widget ou integração não encontrados')
      }

      console.log(
        `Widget encontrado: ${widgetSlug}. Recuperando valores de transação...`,
      )

      const amount = overrideAmount || widget.amount

      if (!amount || amount <= 0) {
        console.error(
          `Valor não definido ou inválido para o widget ${widgetSlug}. Amount: ${amount}`,
        )
        throw new BadRequestError(
          'O valor da transação deve ser fornecido e maior que zero',
        )
      }

      console.log(`Valor final da transação: ${amount}`)

      try {
        const decryptedSecretKey = await aesDecrypt(
          widget.integration.ciphertext,
          widget.integration.iv,
          env.AES_ENCRYPTION_KEY!,
        )

        console.log('Chave secreta desencriptada com sucesso.')

        const gateway = PaymentGatewayFactory.createGateway(
          widget.integration.provider,
          decryptedSecretKey,
          widget.integration.apiKey,
        )

        console.log(
          `Iniciando transação PIX com gateway: ${widget.integration.provider}`,
        )

        const pixPaymentResult = await gateway.initiateTransaction(
          amount,
          {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            documentNumber: customerDocument,
          },
          {
            street: 'Endereço padrão',
            streetNumber: '0',
            complement: '',
            neighborhood: 'Bairro padrão',
            city: 'Cidade padrão',
            state: 'SP',
            zipCode: '00000000',
            country: 'BR',
          },
        )

        // Parseando o resultado da transação
        const pixPayment: PixPaymentResult = JSON.parse(pixPaymentResult)

        const transaction = await prisma.gatewayTransaction.create({
          data: {
            amount,
            currency: 'BRL',
            status: 'PENDING',
            gatewayProvider: widget.integration.provider,
            gatewayReference: pixPayment.id,
            pixCode: pixPayment.pixCode || null,
            qrCodeUrl: pixPayment.qrCodeUrl || null,
            organizationId: widget.organizationId,
            integrationId: widget.integrationId,
            widgetId: widget.id,
          },
        })

        console.log(
          `Transação PIX criada com sucesso para o widget ${widgetSlug}`,
        )

        return reply.status(201).send({
          transactionId: transaction.id,
          amount: transaction.amount,
          currency: transaction.currency,
          status: transaction.status,
          pixCode: transaction.pixCode,
          qrCodeUrl: transaction.qrCodeUrl,
          expiresAt: pixPayment.expiresAt,
        })
      } catch (error) {
        console.error('Erro ao gerar o código PIX:', error)
        throw new BadRequestError('Erro ao gerar o código PIX')
      }
    },
  )
}
