// import { env } from '@shortpay/env'
// import type { FastifyInstance } from 'fastify'
// import type { ZodTypeProvider } from 'fastify-type-provider-zod'
// import { z } from 'zod'

// import { PaymentGatewayFactory } from '@/lib/gateway/src/factory/payment-gateway-factory'
// import { prisma } from '@/lib/prisma'

// import { BadRequestError } from '../_error/bad-request-error'

// export async function createPayment(app: FastifyInstance) {
//   app.withTypeProvider<ZodTypeProvider>().post(
//     '/payments',
//     {
//       schema: {
//         tags: ['Payments'],
//         summary: 'Inicia um novo pagamento sem necessidade de login',
//         body: z.object({
//           planId: z.coerce.string().cuid(), // O plano que o usuário selecionou
//           userEmail: z.string().email().optional(), // O email opcionalmente coletado na LP
//         }),
//         response: {
//           200: z.object({
//             paymentUrl: z.string(), // Retorna a URL do pagamento
//           }),
//         },
//       },
//     },
//     async (request, reply) => {
//       const { planId, userEmail } = request.body

//       // Verificar se o plano existe
//       const plan = await prisma.plan.findUnique({
//         where: { id: planId },
//       })

//       if (!plan) {
//         throw new BadRequestError('Plano não encontrado.')
//       }

//       // Criar uma assinatura com o status PENDING sem associar a um usuário ainda
//       const subscription = await prisma.subscription.create({
//         data: {
//           planId,
//           userEmail, // O email pode ser opcionalmente armazenado
//           startDate: new Date(),
//           endDate: new Date(),
//           status: 'PENDING',
//         },
//       })

//       // Inicializar o pagamento através do gateway
//       const paymentGateway = PaymentGatewayFactory.createGateway()

//       const amountInCents = plan.price * 100
//       const returnUrl = `${env.NEXT_PUBLIC_API_URL}/payments/success?subscriptionId=${subscription.id}`
//       const cancelUrl = `${env.NEXT_PUBLIC_API_URL}/payments/cancel`

//       const initializePaymentResult = await paymentGateway.initializePayment({
//         amount: amountInCents,
//         currency: 'BRL',
//         metadata: {
//           subscriptionId: subscription.id,
//         },
//         returnUrl,
//         cancelUrl,
//       })

//       // Gerar o link de registro (simulado por enquanto no console)
//       const registrationLink = `${env.NEXT_PUBLIC_API_URL}/register?subscriptionId=${subscription.id}`
//       console.log(`Link de registro: ${registrationLink}`)

//       return reply.status(200).send({
//         paymentUrl: initializePaymentResult.paymentUrl,
//       })
//     },
//   )
// }
