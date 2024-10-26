'use client'

import { Bell } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useNotificationsAndInvites } from '@/hooks/use-notifications-and-invites'

import { InvitesList } from './invites-list'
import { NotificationBadge } from './notification-badge'
import { NotificationsList } from './notifications-list'

export function NotificationsAndInvites() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('notifications')
  const {
    notificationsData,
    invitesData,
    hasUnread,
    handleMarkAsRead,
    handleDeleteNotification,
    handleAcceptInvite,
    handleRejectInvite,
  } = useNotificationsAndInvites(isOpen, activeTab)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="relative">
          <Bell className="size-4" />
          <NotificationBadge hasUnread={hasUnread} />
          <span className="sr-only">Notificações e Convites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <Tabs defaultValue="notifications" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="invites">Convites</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications">
            <NotificationsList
              notifications={notificationsData?.notifications ?? []}
              onMarkAsRead={handleMarkAsRead}
              onDelete={handleDeleteNotification}
            />
          </TabsContent>
          <TabsContent value="invites">
            <InvitesList
              invites={invitesData?.invites ?? []}
              onAccept={handleAcceptInvite}
              onReject={handleRejectInvite}
            />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
