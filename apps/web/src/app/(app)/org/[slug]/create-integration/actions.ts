'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrg } from '@/auth/auth'
import { configureGateway } from '@/http/configure-gateway'

const gatewaySchema = z.object({
  provider: z.string().min(1, { message: 'Obrigatório.' }),
  secretKey: z.string().min(1, { message: 'A chave secreta é obrigatória.' }),
  publicKey: z.string().nullable(),
  webhookSecret: z.string().nullable(),
})

export type GatewaySchema = z.infer<typeof gatewaySchema>

export async function createGatewayAction(data: FormData) {
  const result = gatewaySchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return { success: false, message: null, errors }
  }

  const { provider, secretKey, publicKey, webhookSecret } = result.data

  try {
    await configureGateway({
      provider,
      secretKey,
      publicKey: publicKey ?? null,
      webhookSecret: webhookSecret ?? null,
      organizationSlug: getCurrentOrg()!,
    })

    revalidateTag(`integrations`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const errorResponse = await err.response.json()
      const message =
        errorResponse.message || 'Erro na configuração do gateway.'
      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Erro inesperado, tente novamente em alguns minutos.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Gateway configurado com sucesso.',
    errors: null,
  }
}
