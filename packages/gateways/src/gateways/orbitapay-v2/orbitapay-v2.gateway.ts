/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios';

import { orbitapayV2Config } from './config';
import { OrbitaPayEndpoints } from './endpoint';
import {
  type GetCompanyResponse,
  PaymentGateway,
} from './interfaces/payment-orbitapay-v2.interface';
import type { CustomerData } from './types';

export interface AddressData {
  street: string;
  streetNumber: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export class OrbitaGateway implements PaymentGateway {
  private secretKey: string;
  private apiKey: string;

  constructor(secretKey: string, apiKey: string) {
    this.secretKey = secretKey;
    this.apiKey = apiKey;
  }

  async initiateTransaction(
    amount: number,
    customerData: CustomerData,
    addressData: AddressData, // Novo parâmetro
  ): Promise<string> {
    const defaultCustomerData: CustomerData = {
      name: 'Milena Camila Emanuelly',
      email: 'andreacarolinanovaes@gmail.com',
      phone: '86929768706',
      documentNumber: '88170663385',
    };


    const defaultAddressData: any = {
      street: 'Avenida Caubi Sérgio Melo',
      streetNumber: '304',
      complement: 'Pantanal',
      neighborhood: 'Pantanal',
      city: 'Macapá',
      state: 'AP',
      zipCode: '68907301',
      country: 'BR',
    };

    const finalCustomerData = {
      name: customerData.name ?? defaultCustomerData.name,
      email: customerData.email ?? defaultCustomerData.email,
      phone: customerData.phone ?? defaultCustomerData.phone,
      document: {
        number: customerData.documentNumber ?? defaultCustomerData.documentNumber,
        type: 'cpf',
      },
    };

    const finalAddressData = {
      street: addressData.street ?? defaultAddressData.street,
      streetNumber: addressData.streetNumber ?? defaultAddressData.streetNumber,
      complement: addressData.complement ?? defaultAddressData.complement,
      neighborhood: addressData.neighborhood ?? defaultAddressData.neighborhood,
      city: addressData.city ?? defaultAddressData.city,
      state: addressData.state ?? defaultAddressData.state,
      zipCode: addressData.zipCode ?? defaultAddressData.zipCode,
      country: addressData.country ?? defaultAddressData.country,
    };    

    const authToken = Buffer.from(`${this.secretKey}:${this.apiKey}`).toString(
      'base64',
    );
    const url = `${orbitapayV2Config.baseUrl}${OrbitaPayEndpoints.createTransaction}`;

    const data = {
      customer: finalCustomerData,
      address: finalAddressData, // Endereço no nível raiz
      paymentMethod: 'pix',
      amount,
      postbackUrl: 'https://pagamento.com',
      traceable: true,
      items: [
        {
          unitPrice: amount,
          title: 'Pagamento upsell',
          quantity: 1,
          tangible: true,
        },
      ],
      utmQuery: 'string',
      checkoutUrl: 'string',
      referrerUrl: 'pagamento/upsell',
      externalId: 'string',
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Basic ${authToken}`,
        },
      });

      if (response.data.pix && response.data.pix.qrcode) {
        return response.data.pix.qrcode;
      } else {
        throw new Error('Erro ao gerar o código PIX.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro ao gerar o código PIX:', error.response.data);
      } else if (error instanceof Error) {
        console.error('Erro ao gerar o código PIX:', error.message);
      } else {
        console.error('Erro ao gerar o código PIX:', String(error));
      }
      throw new Error('Erro ao gerar o código PIX.');
    }
  }

  async getCompany(): Promise<GetCompanyResponse> {
    const authToken = Buffer.from(`${this.secretKey}:${this.apiKey}`).toString(
      'base64',
    );

    const url = `${orbitapayV2Config.baseUrl}${OrbitaPayEndpoints.getCompany}`;

    try {
      const response = await axios.get(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Basic ${authToken}`,
        },
      });

      if (response.status === 200) {
        return response.data as GetCompanyResponse;
      } else {
        throw new Error('Invalid response from the gateway.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Erro ao obter dados da empresa:', error.response.data);
      } else if (error instanceof Error) {
        console.error('Erro ao obter dados da empresa:', error.message);
      } else {
        console.error('Erro ao obter dados da empresa:', String(error));
      }
      throw new Error('Failed to fetch company data.');
    }
  }
}
