import dayjs from 'dayjs'
import { Check, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Invite {
  id: string
  author?: { name: string }
  organization: { name: string }
  createdAt: string
}

interface InvitesListProps {
  invites: Invite[]
  onAccept: (id: string) => void
  onReject: (id: string) => void
}

export function InvitesList({ invites, onAccept, onReject }: InvitesListProps) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium">
        Convites pendentes ({invites.length})
      </span>

      {invites.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhum convite encontrado.
        </p>
      )}

      {invites.map((invite) => (
        <div key={invite.id} className="space-y-2">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Alguém'}
            </span>{' '}
            convidou você para entrar na{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>{' '}
            <span>{dayjs(invite.createdAt).fromNow()}</span>
          </p>

          <div className="flex gap-1">
            <Button
              onClick={() => onAccept(invite.id)}
              size="xs"
              variant="outline"
            >
              <Check className="mr-1.5 size-3" />
              Aceitar
            </Button>

            <Button
              onClick={() => onReject(invite.id)}
              size="xs"
              variant="ghost"
              className="text-muted-foreground"
            >
              <X className="mr-1.5 size-3" />
              Rejeitar
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
