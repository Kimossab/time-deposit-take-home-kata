import { PrismaClient, TimeDeposit } from '../generated/prisma';
import { Decimal } from '../generated/prisma/runtime/library';

const prisma = new PrismaClient();

const data: TimeDeposit[] = [
  { id: 1, balance: Decimal(10000), days: 10, planType: 'basic' },
  { id: 2, balance: Decimal(40000), days: 182, planType: 'basic' },
  { id: 3, balance: Decimal(90000), days: 400, planType: 'basic' },
  { id: 4, balance: Decimal(10000), days: 10, planType: 'student' },
  { id: 5, balance: Decimal(40000), days: 182, planType: 'student' },
  { id: 6, balance: Decimal(90000), days: 400, planType: 'student' },
  { id: 7, balance: Decimal(10000), days: 10, planType: 'premium' },
  { id: 8, balance: Decimal(40000), days: 182, planType: 'premium' },
  { id: 9, balance: Decimal(90000), days: 400, planType: 'premium' },
]

async function main() {
  await Promise.all(data.map(async (d) => {
    await prisma.timeDeposit.upsert({
      where: { id: d.id },
      update: {},
      create: d
    })
  }))
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })