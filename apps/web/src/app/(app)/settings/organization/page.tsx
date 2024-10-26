import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth/auth'

import { OrganizationSelect } from './organization-select'

export default async function OrganizationPage() {
  const slug = getCurrentOrg()

  return slug ? (
    redirect(`/settings/organization/${slug}`)
  ) : (
    <OrganizationSelect />
  )
}
