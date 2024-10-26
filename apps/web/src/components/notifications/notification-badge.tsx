interface NotificationBadgeProps {
  hasUnread: boolean
}

export function NotificationBadge({ hasUnread }: NotificationBadgeProps) {
  if (!hasUnread) return null

  return (
    <span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500" />
  )
}
