// import { prisma } from '@shortpay/api/src/lib/prisma'

// export class IntegrationService {
//   async getActiveIntegrationById(gatewayIntegrationId: string) {
//     return prisma.integration.findUnique({
//       where: { id: gatewayIntegrationId, status: 'connected' },
//       include: {
//         availableGateway: true, // Inclui apenas o objeto `availableGateway`
//       },
//     })
//   }

//   async getActiveIntegrations(organizationId: string) {
//     return prisma.integration.findMany({
//       where: { organizationId, status: 'connected' },
//       include: {
//         availableGateway: true, // Inclui apenas o objeto `availableGateway`
//       },
//     })
//   }
// }
