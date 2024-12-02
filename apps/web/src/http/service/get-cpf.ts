import { apiService } from './api-service'

interface GetCpfResponse {
  nomeCompleto: string
  dataNascimento?: string
  situacao?: string
  endereco?: {
    logradouro: string
    bairro: string
    cidade: string
    estado: string
  }
}

export async function getCpf(cpf: string): Promise<GetCpfResponse> {
  const result = await apiService
    .post('dados/cpf', {
      json: { cpf },
    })
    .json<GetCpfResponse>()
  return result
}
