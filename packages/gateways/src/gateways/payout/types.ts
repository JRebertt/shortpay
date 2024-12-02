export interface CustomerData {
  name?: string
  email?: string
  phone?: string
  documentNumber?: string
  address?: {
    cep?: string
    complement?: string
    number?: string
    street?: string
    district?: string
    city?: string
    state?: string
  }
}
