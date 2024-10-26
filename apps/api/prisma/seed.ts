import { faker } from '@faker-js/faker'
import {
  GatewayProvider,
  PaymentStatus,
  PrismaClient,
  Role,
  SubscriptionStatus,
} from '@prisma/client'
import { hashPassword } from '@shortpay/utils/crypto'

const prisma = new PrismaClient()

async function seed() {
  // Limpar dados existentes
  await prisma.gatewayTransaction.deleteMany()
  await prisma.paymentGateway.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.plan.deleteMany()
  await prisma.member.deleteMany()
  await prisma.organization.deleteMany()
  await prisma.account.deleteMany()
  await prisma.token.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hashPassword('123456')

  // Criar usuários
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      avatarUrl: 'https://github.com/diego3g.png',
      passwordHash,
      preferredGateway: 'STRIPE',
    },
  })

  const anotherUser = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.internet.avatar(),
      passwordHash,
      preferredGateway: 'PAGARME',
    },
  })

  const anotherUser2 = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatarUrl: faker.image.avatar(),
      passwordHash,
      preferredGateway: 'MERCADO_PAGO',
    },
  })

  // Criar planos
  const basicPlan = await prisma.plan.create({
    data: {
      name: 'Basic Plan',
      price: 29.99,
      duration: 30,
      description: 'Plano básico de assinatura',
    },
  })

  const proPlan = await prisma.plan.create({
    data: {
      name: 'Pro Plan',
      price: 59.99,
      duration: 30,
      description: 'Plano profissional de assinatura',
    },
  })

  // Criar organizações
  const org1 = await prisma.organization.create({
    data: {
      name: 'Acme Inc (Admin)',
      domain: 'acme.com',
      slug: 'acme-admin',
      avatarUrl: faker.internet.avatar(),
      shouldAttachUsersByDomain: true,
      ownerId: user.id,
      members: {
        create: [
          {
            userId: user.id,
            role: 'ADMIN' as Role,
          },
          {
            userId: anotherUser.id,
            role: 'MEMBER' as Role,
          },
          {
            userId: anotherUser2.id,
            role: 'MEMBER' as Role,
          },
        ],
      },
      plans: {
        connect: { id: proPlan.id },
      },
    },
  })

  const org2 = await prisma.organization.create({
    data: {
      name: 'Acme Inc (Billing)',
      slug: 'acme-billing',
      avatarUrl: faker.image.avatar(),
      ownerId: user.id,
      members: {
        create: [
          {
            userId: user.id,
            role: 'BILLING' as Role,
          },
          {
            userId: anotherUser.id,
            role: 'ADMIN' as Role,
          },
          {
            userId: anotherUser2.id,
            role: 'MEMBER' as Role,
          },
        ],
      },
      plans: {
        connect: { id: basicPlan.id },
      },
    },
  })

  await prisma.organization.create({
    data: {
      name: 'Acme Inc (Member)',
      slug: 'acme-member',
      avatarUrl: faker.internet.avatar(),
      ownerId: user.id,
      members: {
        create: [
          {
            userId: user.id,
            role: 'MEMBER' as Role,
          },
          {
            userId: anotherUser.id,
            role: 'ADMIN' as Role,
          },
          {
            userId: anotherUser2.id,
            role: 'MEMBER' as Role,
          },
        ],
      },
      plans: {
        connect: { id: basicPlan.id },
      },
    },
  })

  // Criar assinaturas para os usuários
  const subscription1 = await prisma.subscription.create({
    data: {
      userId: user.id,
      planId: proPlan.id,
      startDate: new Date(),
      endDate: faker.date.future(),
      status: 'ACTIVE' as SubscriptionStatus,
      gatewayProvider: 'STRIPE' as GatewayProvider,
      gatewayReference: faker.string.uuid(),
    },
  })

  const subscription2 = await prisma.subscription.create({
    data: {
      userId: anotherUser.id,
      planId: basicPlan.id,
      startDate: new Date(),
      endDate: faker.date.future(),
      status: 'ACTIVE' as SubscriptionStatus,
      gatewayProvider: 'PAGARME' as GatewayProvider,
      gatewayReference: faker.string.uuid(),
    },
  })

  // Criar pagamentos para as assinaturas
  await prisma.payment.create({
    data: {
      subscriptionId: subscription1.id,
      amount: proPlan.price,
      currency: 'USD',
      status: 'COMPLETED' as PaymentStatus,
      paymentGateway: 'Stripe',
      transactionId: faker.string.uuid(),
    },
  })

  await prisma.payment.create({
    data: {
      subscriptionId: subscription2.id,
      amount: basicPlan.price,
      currency: 'USD',
      status: 'COMPLETED' as PaymentStatus,
      paymentGateway: 'Pagar.me',
      transactionId: faker.string.uuid(),
    },
  })

  // Criar gateways de pagamento para as organizações
  const gateway1 = await prisma.paymentGateway.create({
    data: {
      provider: 'STRIPE' as GatewayProvider,
      apiKey: faker.string.alphanumeric(20),
      secretKey: faker.string.alphanumeric(30),
      webhookSecret: faker.string.alphanumeric(25),
      isActive: true,
      organizationId: org1.id,
    },
  })

  const gateway2 = await prisma.paymentGateway.create({
    data: {
      provider: 'PAGARME' as GatewayProvider,
      apiKey: faker.string.alphanumeric(20),
      secretKey: faker.string.alphanumeric(30),
      webhookSecret: faker.string.alphanumeric(25),
      isActive: true,
      organizationId: org2.id,
    },
  })

  // Criar transações de gateway
  await prisma.gatewayTransaction.create({
    data: {
      amount: 100.0,
      currency: 'BRL',
      status: 'COMPLETED' as PaymentStatus,
      gatewayProvider: 'STRIPE' as GatewayProvider,
      gatewayReference: faker.string.uuid(),
      pixCode: faker.string.alphanumeric(32),
      qrCodeUrl: faker.image.url(),
      paymentGatewayId: gateway1.id,
      organizationId: org1.id,
    },
  })

  await prisma.gatewayTransaction.create({
    data: {
      amount: 150.0,
      currency: 'BRL',
      status: 'PENDING' as PaymentStatus,
      gatewayProvider: 'PAGARME' as GatewayProvider,
      gatewayReference: faker.string.uuid(),
      pixCode: faker.string.alphanumeric(32),
      qrCodeUrl: faker.image.url(),
      paymentGatewayId: gateway2.id,
      organizationId: org2.id,
    },
  })

  console.log('Banco de dados populado com sucesso!')
}

seed()
  .then(() => {
    console.log('Database seeded!')
  })
  .catch((error) => {
    console.error('Error seeding database:', error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
