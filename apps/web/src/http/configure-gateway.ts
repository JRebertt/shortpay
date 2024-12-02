import { revalidateTag } from 'next/cache'

import { api } from './api-client'

interface ConfigureGatewayRequest {
  provider: string
  secretKey: string
  publicKey: string | null
  webhookSecret?: string | null
  organizationSlug: string
}

type ConfigureGatewayResponse = void

export async function configureGateway({
  provider,
  secretKey,
  publicKey,
  webhookSecret = null,
  organizationSlug,
}: ConfigureGatewayRequest): Promise<ConfigureGatewayResponse> {
  revalidateTag('gateway-configuration')

  try {
    await api.post(`organizations/${organizationSlug}/connect-gateway`, {
      json: {
        provider,
        secretKey,
        publicKey,
        webhookSecret,
      },
    })
  } catch (error) {
    console.error('Erro ao configurar o gateway:', error)
    throw error // Repassa o erro para ser tratado na camada superior
  }
}
