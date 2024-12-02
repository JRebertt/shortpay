'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

interface CheckoutFormProps {
  widget: {
    id: string
    name: string
    amount: number
    description: string | null
    type: 'EMBED' | 'SHAREABLE'
    widgetSlug: string | null
    createdAt: Date
    updatedAt: Date
    integrationId: string
    organizationId: string
  }
}

export default function CheckoutForm({ widget }: CheckoutFormProps) {
  const [pixCode, setPixCode] = useState('')

  const generatePixMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/widgets/${widget.id}/pix`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ overrideAmount: widget.amount }),
      })

      if (!response.ok) {
        throw new Error('Erro ao gerar código PIX')
      }

      return response.json()
    },
    onSuccess: (data) => {
      setPixCode(data.pixCode)
    },
    onError: (error) => {
      console.error('Erro ao gerar PIX:', error)
      alert('Não foi possível gerar o PIX. Tente novamente.')
    },
  })

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Finalizar Compra</CardTitle>
          <CardDescription>
            Complete suas informações para gerar o pagamento PIX
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Detalhes do Produto</h3>
                <div className="grid gap-2">
                  <div>
                    <Label>Nome do Produto</Label>
                    <p className="text-sm font-medium">{widget.name}</p>
                  </div>
                  <div>
                    <Label>Descrição</Label>
                    <p className="text-sm">{widget.description}</p>
                  </div>
                  <div>
                    <Label>Valor</Label>
                    <p className="text-sm font-medium">
                      R$ {(widget.amount / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold">
                  Informações do Cliente
                </h3>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input id="name" placeholder="Seu nome completo" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" placeholder="000.000.000-00" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <Button
            onClick={() => generatePixMutation.mutate()}
            disabled={generatePixMutation.isPending}
          >
            {generatePixMutation.isPending ? 'Gerando...' : 'Gerar PIX'}
          </Button>
          {pixCode && (
            <div className="w-full">
              <Label htmlFor="pixCode">Código PIX Gerado</Label>
              <Input id="pixCode" value={pixCode} readOnly className="mt-1" />
              <p className="mt-2 text-sm text-muted-foreground">
                Use este código para fazer o pagamento via PIX. O código expira
                em 30 minutos.
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
