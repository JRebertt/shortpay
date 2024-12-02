import { api } from './api-client'

interface ValidateGatewayRequest {
  provider: string
  secretKey: string
}

interface ValidateGatewayResponse {
  valid: boolean
  message?: string
}

export async function validateGateway({
  provider,
  secretKey,
}: ValidateGatewayRequest): Promise<ValidateGatewayResponse> {
  const result = await api.post('validate-gateway', {
    json: {
      provider,
      secretKey,
    },
  })

  return result
}
