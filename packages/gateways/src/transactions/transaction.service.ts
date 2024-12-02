// /* eslint-disable no-useless-constructor */
// import { prisma } from '@shortpay/api/src/lib/prisma'

// import type { CustomerData } from '../gateways/orbitapay-v2/types'
// import { PaymentGatewayFactory } from '../gateways/payment-gateway.factory'
// import type { IntegrationService } from '../integrations/integration.service'
// import type { TransactionRepository } from './transaction.repository'

// export class TransactionService {
//   constructor(
//     private integrationService: IntegrationService,
//     private transactionRepository: TransactionRepository,
//   ) {}

//   async initiateTransaction(
//     organizationId: string,
//     amount: number,
//     customerData: CustomerData,
//     gatewayIntegrationId?: string,
//   ) {
//     // Busca a integração ativa ou usa o gatewayIntegrationId fornecido
//     const integration = gatewayIntegrationId
//       ? await this.integrationService.getActiveIntegrationById(
//           gatewayIntegrationId,
//         )
//       : (await this.integrationService.getActiveIntegrations(organizationId))[0]

//     if (!integration) {
//       throw new Error('Integration not found or not connected.')
//     }

//     const paymentGateway = await prisma.integration.findFirst({
//       where: {
//         organizationId,
//         id: integration.availableGateway.id,
//       },
//     })

//     if (!paymentGateway) {
//       throw new Error('Payment gateway not found for this integration.')
//     }

//     const gateway = PaymentGatewayFactory.createGateway(
//       integration.availableGateway.provider,
//       integration.secretKey ?? '',
//       integration.apiKey ?? '',
//     )

//     const pixCode = await gateway.initiateTransaction(amount, customerData)

//     await this.transactionRepository.saveTransaction(
//       pixCode,
//       amount,
//       'BRL',
//       organizationId,
//       integration.availableGateway.provider,
//       paymentGateway.id,
//     )

//     return pixCode
//   }

//   async checkTransactionStatus(transactionId: string) {
//     return this.transactionRepository.getTransactionStatus(transactionId)
//   }
// }
