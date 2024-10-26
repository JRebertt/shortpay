import { organizationSchema } from '@shortpay/auth'
import { AlertCircle, ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'
import { Suspense } from 'react'

import { OrganizationForm } from '@/app/(app)/create-organization/organization-form'
import { removeMemberAction } from '@/app/(app)/org/[slug]/members/actions'
import { Invites } from '@/app/(app)/org/[slug]/members/invites'
import { UpdateMemberRoleSelect } from '@/app/(app)/org/[slug]/members/update-member-role-select'
import { ShutdownOrganizationWithConfirmation } from '@/app/(app)/org/[slug]/settings/shutdown-organization-with-confirmation'
import { ability, getCurrentOrg } from '@/auth/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { cn } from '@/lib/utils'

export default async function currentOrganizationPage() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability(currentOrg!)

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  // Permissões de Organização
  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  // Permissões de Usuário
  const canUpdateUser = permissions?.can('update', 'User')
  const canDeleteUser = permissions?.can('delete', 'User')
  const canTransferOwnership = permissions?.can(
    'transfer_ownership',
    authOrganization,
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-4">
        {currentOrg && (
          <>
            {/* Organização */}
            <Card className="relative">
              {canUpdateOrganization && (
                <CardHeader>
                  <CardTitle>Organização</CardTitle>
                  <CardDescription>
                    Atualize as informações da sua organização.
                  </CardDescription>
                </CardHeader>
              )}
              <CardContent className={cn(!canUpdateOrganization && 'pt-6')}>
                <div
                  className={cn(
                    'transition-all duration-200',
                    !canUpdateOrganization &&
                      'pointer-events-none blur-sm filter',
                  )}
                >
                  <OrganizationForm
                    isUpdating={true}
                    initialData={organization}
                  />
                </div>
                {!canUpdateOrganization && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <Alert variant="warning" className="w-[90%] max-w-md">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Acesso Restrito</AlertTitle>
                      <AlertDescription>
                        Você não tem permissão para atualizar as informações da
                        organização.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Dados de Cobrança */}
            {canGetBilling && (
              <Card>
                <CardHeader>
                  <CardTitle>Dados de Cobrança</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Você tem acesso aos dados de cobrança.</p>
                  {/* Adicione aqui a lógica para exibir os dados de cobrança */}
                </CardContent>
              </Card>
            )}

            {/* Convites */}
            {permissions?.can('get', 'Invite') && <Invites />}

            {/* Lista de Membros */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Lista de Membros</h2>
              <div className="rounded border">
                <Table>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="py-2.5" style={{ width: 48 }}>
                          <Avatar>
                            <AvatarFallback />
                            {member.avatarUrl && (
                              <Image
                                src={member.avatarUrl}
                                width={32}
                                height={32}
                                alt={`Avatar de ${member.name || 'Usuário'}`}
                                className="aspect-square size-full"
                              />
                            )}
                          </Avatar>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex flex-col">
                            <span className="inline-flex items-center gap-2 font-medium">
                              {member.name}
                              {member.userId === membership.userId && ' (eu)'}
                              {organization.ownerId === member.userId && (
                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                  <Crown className="size-3" />
                                  Admin
                                </span>
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {member.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-2.5">
                          <div className="flex items-center justify-end gap-2">
                            {canTransferOwnership && (
                              <Button size="sm" variant="ghost">
                                <ArrowLeftRight className="mr-2 size-4" />
                                Transferir posse
                              </Button>
                            )}

                            <UpdateMemberRoleSelect
                              memberId={member.id}
                              value={member.role}
                              disabled={
                                member.userId === membership.userId ||
                                member.userId === organization.ownerId ||
                                !canUpdateUser
                              }
                            />

                            {canDeleteUser && (
                              <form
                                action={removeMemberAction.bind(
                                  null,
                                  member.id,
                                )}
                              >
                                <Button
                                  disabled={
                                    member.userId === membership.userId ||
                                    member.userId === organization.ownerId
                                  }
                                  type="submit"
                                  size="sm"
                                  variant="destructive"
                                >
                                  <UserMinus className="mr-2 size-4" />
                                  Remover
                                </Button>
                              </form>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Encerrar Organização */}
            {canShutdownOrganization && (
              <Card>
                <CardHeader>
                  <CardTitle>Encerrar organização</CardTitle>
                  <CardDescription>
                    Isso excluirá todos os dados da organização, incluindo todos
                    os projetos. Esta ação não pode ser desfeita.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ShutdownOrganizationWithConfirmation />
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </Suspense>
  )
}
