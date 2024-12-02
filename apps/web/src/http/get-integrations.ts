import { api } from './api-client'

interface GetIntegrationsRequest {
  org: string
  search?: string
  status?: 'connected' | 'disconnected'
}

interface GetIntegrationsResponse {
  integrations: {
    description: string | null
    slug: string
    status: 'connected' | 'disconnected'
    id: string
    name: string
    provider: string
    icon: string | null
    domain: string | null
  }[]
}

export async function getIntegrations({
  org,
  search,
  status,
}: GetIntegrationsRequest): Promise<GetIntegrationsResponse> {
  const result = await api
    .get(`organizations/${org}/integrations`, {
      searchParams: {
        ...(status && { status }),
        ...(search && { name: search }),
      },
      next: {
        tags: [`integrations`],
      },
    })
    .json<GetIntegrationsResponse>()

  return result
}
