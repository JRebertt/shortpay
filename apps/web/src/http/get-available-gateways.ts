import { api } from './api-client'

interface GetAvailableGatewaysResponse {
  availableGateways: {
    id: string
    name: string
    slug: string
    provider: string
    description: string | null
    icon: string | null
    domain: string | null
  }[]
}

export async function getAvailableGateways() {
  const result = await api
    .get('available-gateways')
    .json<GetAvailableGatewaysResponse>()

  return result
}
