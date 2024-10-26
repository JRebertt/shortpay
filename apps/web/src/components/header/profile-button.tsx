import { ChevronDown, Cog, LogOut } from 'lucide-react'
import Link from 'next/link'

import { auth } from '@/auth/auth'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

function getSubscriptionBadgeProps(subscription: string): {
  label: string
} {
  switch (subscription.toLowerCase()) {
    case 'pro':
      return { label: 'PRO' }
    case 'basic':
      return { label: 'BASIC' }
    default:
      return { label: 'FREE' }
  }
}

export async function ProfileButton() {
  const { user } = await auth()
  const { label } = getSubscriptionBadgeProps(user.subscription)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <Avatar>
          {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
          {user.name && (
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{user.name}</span>
            <Badge variant="default" className={`px-1 py-0 text-[10px] `}>
              {label}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {/* <DropdownMenuItem asChild>
            <ThemeSelect />
          </DropdownMenuItem> */}
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings/profile">
              <Cog className="mr-2 size-4" />
              Ajustes
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href="/api/auth/sign-out">
              <LogOut className="mr-2 size-4" />
              Sair
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
