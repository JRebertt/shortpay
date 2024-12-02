'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { Skeleton } from '@/components/ui/skeleton'
import { useConnectParams } from '@/hooks/ use-connect-params'
import { getIntegrations } from '@/http/get-integrations'

import { IntegrationCard } from './integration-card'
import { IntegrationsFilters } from './integration-filters'

export default function IntegrationsPage() {
  const { slug } = useParams<{ slug: string }>()
  const { q: search, filter: activeFilter } = useConnectParams()

  const filterStatus =
    activeFilter === 'All' || !activeFilter
      ? undefined
      : (activeFilter.toLowerCase() as 'connected' | 'disconnected' | undefined)

  const { data: integrationsData, isLoading } = useQuery({
    queryKey: [slug, 'integrations', search, filterStatus],
    queryFn: () =>
      getIntegrations({
        org: slug!,
        status: filterStatus,
        search,
      }),
    enabled: !!slug,
  })

  const integrationAmount = integrationsData?.integrations?.length || 0

  return (
    <div className="space-y-4 p-4">
      <h1 className="mb-4 text-2xl font-bold">
        My Integrations ({integrationAmount})
      </h1>

      <IntegrationsFilters />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] w-full" />
          ))}
        </div>
      ) : !integrationsData || integrationAmount === 0 ? (
        <p className="mt-8 text-center text-gray-500">
          No integrations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrationsData.integrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      )}
    </div>
  )
}
