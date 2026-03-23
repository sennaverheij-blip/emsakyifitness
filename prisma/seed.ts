import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('admin123', 10)

  await prisma.user.upsert({
    where: { email: 'emin@emsakyifitness.com' },
    update: { hashedPassword: password },
    create: {
      email: 'emin@emsakyifitness.com',
      name: 'Emin',
      hashedPassword: password,
      role: 'main-coach',
    },
  })

  // Demo coach
  await prisma.user.upsert({
    where: { email: 'coach@emsakyifitness.com' },
    update: { hashedPassword: password },
    create: {
      email: 'coach@emsakyifitness.com',
      name: 'Coach Demo',
      hashedPassword: password,
      role: 'coach',
    },
  })

  // Demo client
  const client = await prisma.user.upsert({
    where: { email: 'client@demo.com' },
    update: { hashedPassword: password },
    create: {
      email: 'client@demo.com',
      name: 'Marcus',
      hashedPassword: password,
      role: 'client',
      country: 'Netherlands',
    },
  })

  // Assign client to Emin
  const emin = await prisma.user.findUnique({ where: { email: 'emin@emsakyifitness.com' } })
  if (emin) {
    await prisma.coachClient.upsert({
      where: { coachId_clientId: { coachId: emin.id, clientId: client.id } },
      update: {},
      create: { coachId: emin.id, clientId: client.id, tier: 'elite' },
    })
  }

  console.log('Seed complete')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
