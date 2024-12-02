export const integrationsConfig = [
  {
    id: 1,
    name: 'IOPAY',
    slug: 'iopay',
    provider: 'iopayProvider',
    description: 'Online payments with Pix and secure transactions.',
    status: 'disconnected',
    icon: '/icons/iopay.svg',
    domain: 'iopay.com.br',
  },
  {
    id: 2,
    name: 'Click2Pay',
    slug: 'clickpay',
    provider: 'click2PayProvider',
    description:
      'Pix, credit card, and boleto integration for secure payments.',
    status: 'disconnected',
    icon: '/icons/click2pay.svg',
    domain: 'click2pay.com',
  },
  {
    id: 3,
    name: 'MoneyCollect',
    slug: 'money-collect',
    provider: 'moneyCollectProvider',
    description:
      'Ideal for e-commerce with support for Pix and boleto payments.',
    status: 'connected',
    icon: '/icons/moneycollect.svg',
    domain: 'moneycollect.com',
  },
  {
    id: 4,
    name: 'PagSeguro',
    slug: 'pagseguro',
    provider: 'pagSeguroProvider',
    description:
      'Popular in Brazil with Pix, credit, and debit payment options.',
    status: 'connected',
    icon: '/icons/pagseguro.svg',
    domain: 'pagseguro.uol.com.br',
  },
  {
    id: 5,
    name: 'Mercado Pago',
    slug: 'mercado-pago',
    provider: 'mercadoPagoProvider',
    description:
      'Supports Pix and offers competitive rates and easy integration.',
    status: 'connected',
    icon: '/icons/mercadopago.svg',
    domain: 'mercadopago.com.br',
  },
]
