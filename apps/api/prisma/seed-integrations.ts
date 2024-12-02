import { PrismaClient } from '@prisma/client'

import { availableGateways } from '../src/utils/const'

const prisma = new PrismaClient()

async function seedAvailableGateways() {
  for (const gateway of availableGateways) {
    const existingGateway = await prisma.availableGateway.findUnique({
      where: { slug: gateway.slug },
    })

    if (!existingGateway) {
      await prisma.availableGateway.create({ data: gateway })
      console.log(`Gateway ${gateway.name} added successfully.`)
    } else {
      console.log(`Gateway ${gateway.name} already exists, skipping.`)
    }
  }
}

seedAvailableGateways()
  .then(async () => {
    console.log('Available gateways seeded successfully!')
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error('Error seeding available gateways: ', error)
    await prisma.$disconnect()
  })
