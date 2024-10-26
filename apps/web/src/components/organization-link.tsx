'use client'

import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

interface OrganizationLinkProps {
  organization: {
    id: string
    name: string
    slug: string
    avatarUrl?: string | null
    role: 'ADMIN' | 'BILLING' | 'MEMBER'
  }
  disabled: boolean
}

const roleBadgeProps = {
  ADMIN: { label: 'Admin' },
  BILLING: { label: 'Billing' },
  MEMBER: { label: 'Member' },
}

export function OrganizationLink({
  organization,
  disabled,
}: OrganizationLinkProps) {
  const { label } = roleBadgeProps[organization.role]

  return (
    <Link
      href={`/org/${organization.slug}`}
      className={`flex items-center justify-between ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
        }
      }}
    >
      <div className="flex items-center">
        <Avatar className="mr-2 size-4">
          {organization.avatarUrl && (
            <AvatarImage src={organization.avatarUrl} />
          )}
          <AvatarFallback />
        </Avatar>
        <span className="line-clamp-1">{organization.name}</span>
      </div>
      <Badge variant="outline" className="px-1 py-0 text-[10px]">
        {label}
      </Badge>
    </Link>
  )
}
