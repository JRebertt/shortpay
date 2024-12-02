import { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export async function handlePixWebhook(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/webhooks/pix',
    {
      schema: {
        tags: ['Widget'],
        summary: 'Cadastra um novo widget para uma organização.',
        body: z.object({
          txid: z.string().min(1, 'O nome do widget é obrigatório.'),
          status: z.string(),
        }),
        params: z.object({
          slug: z.string(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { txid, status } = request.body

      // Verifica se os dados foram recebidos
      if (!txid || !status) {
        throw Error('Missing txid or status')
      }

      // Busca a transação no banco
      const transaction = await prisma.gatewayTransaction.findUnique({
        where: { id: txid },
      })

      if (!transaction) {
        throw Error('Transaction not found')
      }

      // Atualiza o status da transação
      await prisma.gatewayTransaction.update({
        where: { id: txid },
        data: { status },
      })

      return reply.status(200).send({ message: 'Transaction status updated' })
    },
  )
}
