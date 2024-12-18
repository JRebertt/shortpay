import { defineAbilityFor } from '@shortpay/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export function getCurrentOrg() {
  return cookies().get('org')?.value ?? null
}

export function getCurrentPathName() {
  return cookies().get('path-name')?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await getMembership(org)

  return membership
}

export async function ability(slug?: string) {
  let membership

  if (slug) {
    const result = await getMembership(slug)
    membership = result?.membership
  } else {
    membership = await getCurrentMembership()
  }

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
    organizationId: membership.organizationId,
  })

  return ability
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
export async function getCurrentSubscription() {
  const { user } = await getProfile()

  const subscription = user.subscription

  return subscription
}
