import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require('pg');

async function main() {
  const connectionString = process.env.DATABASE_URL!;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool as any);
  const prisma = new PrismaClient({ adapter } as any);

  console.log('🌱 Seeding database...');

  const managerPassword = await bcrypt.hash('manager123', 10);
  const keeperPassword = await bcrypt.hash('keeper123', 10);

  const manager = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      password: managerPassword,
      name: 'Store Manager',
      role: 'MANAGER',
    },
  });

  const keeper = await prisma.user.upsert({
    where: { email: 'keeper@example.com' },
    update: {},
    create: {
      email: 'keeper@example.com',
      password: keeperPassword,
      name: 'Store Keeper',
      role: 'STORE_KEEPER',
    },
  });

  console.log('✅ Users seeded:');
  console.log(`   Manager  → email: manager@example.com  | password: manager123`);
  console.log(`   Keeper   → email: keeper@example.com   | password: keeper123`);

  // Seed some sample products
  await prisma.product.createMany({
    data: [
      {
        name: 'Steel Bolts M8',
        description: 'High-tensile steel bolts 8mm',
        category: 'Fasteners',
        quantity: 500,
        unit: 'pcs',
        price: 0.25,
        supplier: 'MetalPro Ltd',
        status: 'IN_STOCK',
      },
      {
        name: 'Safety Gloves',
        description: 'Cut-resistant work gloves, size L',
        category: 'Safety Equipment',
        quantity: 8,
        unit: 'pairs',
        price: 12.99,
        supplier: 'SafeWork Co',
        status: 'LOW_STOCK',
      },
      {
        name: 'Hydraulic Oil 5L',
        description: 'ISO 46 hydraulic oil 5 litre container',
        category: 'Lubricants',
        quantity: 0,
        unit: 'cans',
        price: 34.5,
        supplier: 'OilTech Supply',
        status: 'OUT_OF_STOCK',
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Sample products seeded');

  await prisma.$disconnect();
  pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

