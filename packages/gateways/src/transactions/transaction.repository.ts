// import { prisma } from '@shortpay/api/src/lib/prisma'

// export class TransactionRepository {
//   async saveTransaction(
//     pixCode: string,
//     amount: number,
//     currency: string,
//     organizationId: string,
//     gatewayProvider: string,
//     integrationId: string,
//   ) {
//     return prisma.gatewayTransaction.create({
//       data: {
//         pixCode,
//         amount,
//         currency,
//         organizationId,
//         gatewayProvider,
//         integrationId,
//         status: 'PENDING',
//       },
//     })
//   }

//   // Consulta o status de uma transação existente
//   async getTransactionStatus(transactionId: string) {
//     const transaction = await prisma.gatewayTransaction.findUnique({
//       where: { id: transactionId },
//     })
//     return transaction?.status
//   }
// }
