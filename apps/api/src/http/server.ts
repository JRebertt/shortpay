import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@shortpay/env'
import { fastify } from 'fastify'
import fastifyRawBody from 'fastify-raw-body'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { createAccount } from './routes/auth/create-account'
import { getProfile } from './routes/auth/get-profile'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
import { getOrganizationBilling } from './routes/billing/get-organization-billing'
import { createIntegration } from './routes/integrations/create-integration'
import { generatePaymentLink } from './routes/integrations/generate-link'
import { getAvailableGateways } from './routes/integrations/get-available-gateways'
import { getOrganizationIntegrations } from './routes/integrations/get-integrations'
import { acceptInvite } from './routes/invites/accept-invite'
import { createInvite } from './routes/invites/create-invites'
import { getInvite } from './routes/invites/get-invite'
import { getInvites } from './routes/invites/get-invites'
import { getPendingInvites } from './routes/invites/get-pending-invites'
import { rejectInvite } from './routes/invites/reject-invite'
import { revokeInvite } from './routes/invites/revoke-invite'
import { getMembers } from './routes/members/get-members'
import { removeMember } from './routes/members/remove-member'
import { updateMember } from './routes/members/update-member'
import { createOrganization } from './routes/orgs/create-organization'
import { getMembership } from './routes/orgs/get-membership'
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
import { shutdownOrganization } from './routes/orgs/shutdown-organization'
import { transferOrganization } from './routes/orgs/transfer-organization'
import { updateOrganization } from './routes/orgs/update-organization'
import { getPlans } from './routes/payments/get-payments'
import { createProduct } from './routes/products/create-product'
import { getProduct } from './routes/products/get-product'
import { getProducts } from './routes/products/get-products'
import { createTransaction } from './routes/transaction/create-transation'
import { createWidget } from './routes/widgets/create-widgets'
import { getWidgetBySlug } from './routes/widgets/get-widget-by-slug'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyRawBody, {
  field: 'rawBody',
  global: false,
  encoding: 'utf8',
  runFirst: true,
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
// https://github.com/login/oauth/authorize?client_id=Ov23lizKiW8Qr5ktQyCb&redirect_uri=http://localhost:3000/api/auth/callback&scope=user:email

// Authenticate
app.register(authenticateWithPassword)
app.register(authenticateWithGithub)
app.register(createAccount)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

// Organizatons
app.register(createOrganization)
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)

// Members
app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

// Invites
app.register(createInvite)
app.register(getInvite)
app.register(getInvites)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvites)

// Billing
app.register(getOrganizationBilling)

// Plans
app.register(getPlans)

// Gateways

// Integrations
app.register(createIntegration)
app.register(generatePaymentLink)
app.register(getOrganizationIntegrations)
app.register(getAvailableGateways)

// Products
app.register(createProduct)
app.register(getProduct)
app.register(getProducts)

// Widgets
app.register(createWidget)
app.register(getWidgetBySlug)

// Transactions
app.register(createTransaction)

app.register(fastifyCors)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('Http server runnig 🚀')
})
