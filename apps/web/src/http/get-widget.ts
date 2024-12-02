import { api } from './api-client'

interface GetWidgetRequest {
  widgetSlug: string
}

interface GetWidgetResponse {
  widget: {
    id: string
    name: string
    amount: number
    description: string | null
    type: 'EMBED' | 'SHAREABLE'
    widgetSlug: string | null
    createdAt: Date
    updatedAt: Date
    integrationId: string
    organizationId: string
  }
}

export async function getWidget({
  widgetSlug,
}: GetWidgetRequest): Promise<GetWidgetResponse> {
  const result = await api
    .get(`widgets/${widgetSlug}`, {
      next: {
        tags: [`widgets`],
      },
    })
    .json<GetWidgetResponse>()

  return result
}
