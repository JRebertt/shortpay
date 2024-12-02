// import { useQuery } from '@tanstack/react-query'
// import { useEffect, useState } from 'react'

// import { getPendingInvites } from '@/http/get-pending-invites'

// interface Notification {
//   id: string
//   title: string
//   content: string
//   createdAt: number
//   read: boolean
// }

// interface Invite {
//   id: string
//   author: { name: string }
//   organization: { name: string }
//   createdAt: number
// }

// interface NotificationsData {
//   notifications: Notification[]
// }

// interface InvitesData {
//   invites: Invite[]
// }

// // Fictitious data
// const notificationsData = {
//   notifications: [
//     {
//       id: '1',
//       title: 'Nova atualização disponível',
//       content: 'Atualize o sistema para a versão 1.2.3',
//       createdAt: new Date().setDate(new Date().getDate() - 1), // Um dia atrás
//     },
//     {
//       id: '2',
//       title: 'Pagamento realizado',
//       content: 'Seu pagamento foi confirmado com sucesso.',
//       createdAt: new Date().setDate(new Date().getDate() - 3), // Três dias atrás
//     },
//   ],
// }

// const invitesData = {
//   invites: [
//     {
//       id: '1',
//       author: { name: 'João Silva' },
//       organization: { name: 'Empresa XYZ' },
//       createdAt: new Date().setDate(new Date().getDate() - 2), // Dois dias atrás
//     },
//     {
//       id: '2',
//       author: { name: 'Maria Souza' },
//       organization: { name: 'Organização ABC' },
//       createdAt: new Date().setDate(new Date().getDate() - 5), // Cinco dias atrás
//     },
//   ],
// }

// export function useNotificationsAndInvites(
//   _isOpen: boolean,
//   _activeTab: string,
// ) {
//   const [hasUnread, setHasUnread] = useState(false)

//   // const { data: invitesData } = useQuery<InvitesData>({
//   //   queryKey: ['pending-invites'],
//   //   queryFn: getPendingInvites,
//   //   enabled: isOpen && activeTab === 'invites',
//   // })

//   useEffect(() => {
//     const unreadNotifications = notificationsData.notifications.some(
//       (n) => !n.read,
//     )
//     const hasPendingInvites = (invitesData?.invites.length ?? 0) > 0
//     setHasUnread(unreadNotifications || hasPendingInvites)
//   }, [invitesData])

//   async function handleMarkAsRead(notificationId: string) {
//     console.log(notificationId)
//     // Implement the actual logic to mark as read
//   }

//   async function handleDeleteNotification(notificationId: string) {
//     console.log(notificationId)
//     // Implement the actual logic to delete notification
//   }

//   async function handleAcceptInvite(inviteId: string) {
//     console.log(inviteId)
//     // Implement the actual logic to accept invite
//   }

//   async function handleRejectInvite(inviteId: string) {
//     console.log(inviteId)
//     // Implement the actual logic to reject invite
//   }

//   return {
//     notificationsData,
//     invitesData,
//     hasUnread,
//     handleMarkAsRead,
//     handleDeleteNotification,
//     handleAcceptInvite,
//     handleRejectInvite,
//   }
// }
