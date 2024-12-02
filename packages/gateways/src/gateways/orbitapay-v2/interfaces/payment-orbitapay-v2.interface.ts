/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AddressData } from '../orbitapay-v2.gateway'
import type { CustomerData } from '../types'

export type GetCompanyResponse = {
  id?: number
  userId?: number
  legalName?: string
  blocked?: boolean
  invoiceDescriptor?: string
  commercialName?: string | null
  createdAt?: string
  uploadedDocuments?: boolean
  user?: {
    id: number
    email: string
    phone: string
    name: string
    isEmailVerified: boolean
    isPhoneVerified: boolean
    isAdmin: boolean
    isMaster: boolean
    createdAt: string
  }
  document?: {
    id: number
    number: string
    type: string
  }
  permissions?: {
    id: number
    companyId: number
    isCreditCardAvailable: boolean
    isBoletoAvailable: boolean
    isPixAvailable: boolean
    transferEnabled: boolean
    transferPriceCents: number
    anticipationEnabled: boolean
    anticipatableVolumePercentage: number
    anticipationPricePercent: number
    minAnticipatableDays: number
    createdAt: string
  }
  details?: {
    id: number
    averageRevenue: number
    averageTicket: number
    physicalProducts: boolean
    productsDescription: string
    siteUrl: string
    phone: string
    email: string
    createdAt: string
  }
  legalRepresentative?: {
    id: number
    name: string
    phone: string
    motherName: string
    birthdate: string
    createdAt: string
    document: {
      id: number
      number: string
      type: string
    }
  }
  socialContract?: any | null
  partnerDocument?: any | null
  address?: {
    id: number
    street: string
    streetNumber: string
    complement: string | null
    zipCode: string
    neighborhood: string
    city: string
    state: string
    country: string
  }
  revenue?: {
    totalAmount: number
    totalCount: number
    cardAmount: number
    cardCount: number
    pixAmount: number
    pixCount: number
    boletoAmount: number
    boletoCount: number
    chargebackAmount: number
    chargebackCount: number
    refundAmount: number
    refundCount: number
    createdAt: string
  }
  defaultRecipient?: {
    id: number
    legalName: string
    createdAt: string
    document: {
      id: number
      number: string
      type: string
    }
    transferSettings: {
      id: number
      transferEnabled: boolean
      automaticAnticipationEnabled: boolean
      anticipatableVolumePercentage: number
      createdAt: string
    }
    balance: {
      available: number
      updatedAt: string
    }
  }
}

export interface PaymentGateway {
  initiateTransaction(
    amount: number,
    customerData: CustomerData,
    addressData: AddressData, // Novo parâmetro

  ): Promise<string>
  getCompany(): Promise<GetCompanyResponse>
  // checkTransactionStatus(transactionId: string): Promise<any>
  // cancelTransaction(transactionId: string): Promise<any>
}
