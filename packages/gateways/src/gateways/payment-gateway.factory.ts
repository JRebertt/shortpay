import type { PaymentGateway } from './orbitapay-v2/interfaces/payment-orbitapay-v2.interface'
import { OrbitaGateway } from './orbitapay-v2/orbitapay-v2.gateway'

export class PaymentGatewayFactory {
  static createGateway(
    provider: string,
    secretKey: string,
    apiKey: string,
  ): PaymentGateway {
    switch (provider) {
      case 'orbitaPayV2Provider':
        return new OrbitaGateway(secretKey, apiKey)
      default:
        throw new Error(`Provider ${provider} não é suportado.`)
    }
  }
}
