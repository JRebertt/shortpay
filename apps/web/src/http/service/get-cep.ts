import { apiService } from './api-service'

interface GetCepResponse {
  logradouro: string
  bairro: string
  cidade: string
  estado: string
  complemento?: string
}

export async function getCep(cep: string): Promise<GetCepResponse> {
  const result = await apiService
    .post('dados/cep', {
      json: { cep },
    })
    .json<GetCepResponse>()
  return result
}
