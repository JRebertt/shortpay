// import { GatewayProvider } from '@shortpay/gateways/src/constants/gateways'
// import axios from 'axios'
// import type { FastifyInstance } from 'fastify'
// import type { ZodTypeProvider } from 'fastify-type-provider-zod'
// import { z } from 'zod'

// import { auth } from '@/http/middleware/auth'

// import { BadRequestError } from '../_error/bad-request-error'

// export async function validateGateway(app: FastifyInstance) {
//   app
//     .withTypeProvider<ZodTypeProvider>()
//     .register(auth)
//     .post(
//       '/validate-gateway',
//       {
//         schema: {
//           tags: ['PaymentGateway'],
//           summary: 'Validate gateway credentials',
//           security: [{ bearerAuth: [] }],
//           body: z.object({
//             provider: z.nativeEnum(GatewayProvider),
//             apiKey: z.string().min(1),
//             secretKey: z.string().min(1),
//           }),
//           response: {
//             200: z.object({
//               valid: z.boolean(),
//               message: z.string().optional(),
//             }),
//           },
//         },
//       },
//       async (request, reply) => {
//         const { provider, apiKey, secretKey } = request.body

//         if (provider !== GatewayProvider.ORBITAPAY) {
//           throw new BadRequestError('Unsupported gateway provider.')
//         }

//         try {
//           const authHeader = `Basic ${Buffer.from(`${apiKey}:${secretKey}`).toString('base64')}`
//           const response = await axios.get(
//             'https://api.dashboard.orbitapay.com.br/v1/company',
//             {
//               headers: {
//                 accept: 'application/json',
//                 authorization: authHeader,
//               },
//             },
//           )

//           if (response.status === 200) {
//             return reply.status(200).send({ valid: true })
//           } else {
//             throw new Error('Invalid credentials')
//           }
//         } catch (error) {
//           console.error('Failed to connect to Órbita API:', error)
//           return reply
//             .status(200)
//             .send({ valid: false, message: 'Invalid gateway credentials.' })
//         }
//       },
//     )
// }
