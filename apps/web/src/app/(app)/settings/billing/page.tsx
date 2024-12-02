import { ArrowUpCircle, CreditCard } from 'lucide-react'

import { getCurrentOrg } from '@/auth/auth'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getBilling } from '@/http/get-billing'

export default async function EnhancedBilling() {
  const currentOrg = getCurrentOrg()
  const { billing } = await getBilling(currentOrg!)

  console.log(billing)

  return (
    <>
      <Separator />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Faturamento</CardTitle>
            <CardDescription>
              Informações detalhadas sobre os custos e assinatura da sua
              organização
            </CardDescription>
          </div>
          <Badge
            variant={
              billing.subscription.status === 'ACTIVE' ? 'default' : 'secondary'
            }
          >
            {billing.subscription.status}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Detalhes da Assinatura</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Plano Atual</TableCell>
                    <TableCell>{billing.subscription.plan.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Preço do Plano</TableCell>
                    <TableCell>
                      {billing.subscription.plan.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                      {' / '}
                      {
                        billing.subscription.plan.duration
                      } dias
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data de Início</TableCell>
                    <TableCell>
                      {new Date(
                        billing.subscription.startDate,
                      ).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data de Término</TableCell>
                    <TableCell>
                      {new Date(
                        billing.subscription.endDate,
                      ).toLocaleDateString('pt-BR')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="text-lg font-medium">Uso Atual</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de custo</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Membros</TableCell>
                    <TableCell className="text-right">
                      {billing.seats.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      {billing.seats.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Clientes</TableCell>
                    <TableCell className="text-right">
                      {billing.clients.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      {billing.clients.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">
                      {billing.total.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <div>
              <h3 className="text-lg font-medium">Histórico de Pagamentos</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Método</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* {billing.payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        {new Date(payment.createdAt).toLocaleDateString(
                          'pt-BR',
                        )}
                      </TableCell>
                      <TableCell>
                        {payment.amount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: payment.currency,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === 'COMPLETED'
                              ? 'success'
                              : 'warning'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.paymentGateway}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline">
                <CreditCard className="mr-2 h-4 w-4" />
                Atualizar método de pagamento
              </Button>
              {billing.subscription.plan.name !== 'PRO' && (
                <Button>
                  <ArrowUpCircle className="mr-2 h-4 w-4" />
                  Fazer upgrade para PRO
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
