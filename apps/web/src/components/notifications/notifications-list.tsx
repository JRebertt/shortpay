import { dayjs } from '@shortpay/dayjs'
import { Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Notification {
  id: string
  title: string
  content: string
  createdAt: string
}

interface NotificationsListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

export function NotificationsList({
  notifications,
  onMarkAsRead,
  onDelete,
}: NotificationsListProps) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium">
        Notificações ({notifications.length})
      </span>

      {notifications.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma notificação encontrada.
        </p>
      )}

      {notifications.map((notification) => (
        <div key={notification.id} className="space-y-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {notification.title}
            </span>{' '}
            {notification.content}{' '}
            <span>{dayjs(notification.createdAt).fromNow()}</span>
          </p>

          <div className="flex gap-1">
            <Button
              onClick={() => onMarkAsRead(notification.id)}
              size="xs"
              variant="outline"
            >
              <Check className="mr-1.5 size-3" />
              Marcar como lida
            </Button>

            <Button
              onClick={() => onDelete(notification.id)}
              size="xs"
              variant="ghost"
              className="text-muted-foreground"
            >
              <X className="mr-1.5 size-3" />
              Excluir
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
