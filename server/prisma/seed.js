import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { config } from "../src/configs/env.js";

const connectionString = `${config.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const roles = [
    {
      name: "Super Admin",
      slug: "SUPER_ADMIN",
    },
    {
      name: "Clinic Admin",
      slug: "CLINIC_ADMIN",
    },
    {
      name: "Doctor",
      slug: "DOCTOR",
    },
    {
      name: "Staff",
      slug: "STAFF",
    },
    {
      name: "Patient",
      slug: "PATIENT",
    },
  ];

  const plans = [
    {
      name: "Trial",
      slug: "TRIAL",
      monthlyPrice: 0,
      doctorLimit: 2,
      trialDays: 14,
      isCustom: false,
    },
    {
      name: "Starter",
      slug: "STARTER",
      monthlyPrice: 99,
      doctorLimit: 5,
      trialDays: 7,
      isCustom: false,
    },
    {
      name: "Growth",
      slug: "GROWTH",
      monthlyPrice: 199,
      doctorLimit: 25,
      trialDays: 14,
      isCustom: false,
    },
    {
      name: "Enterprise",
      slug: "ENTERPRISE",
      monthlyPrice: 0,
      doctorLimit: null,
      trialDays: null,
      isCustom: true,
    },
  ];

  // Seed roles
  for (const role of roles) {
    await prisma.role.upsert({
      where: {
        slug: role.slug,
      },
      update: {},
      create: role,
    });
  }

  // Seed subscription plans
  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: {
        slug: plan.slug,
      },
      update: {},
      create: plan,
    });
  }

  // Find super admin role
  const superAdminRole = await prisma.role.findUnique({
    where: {
      slug: "SUPER_ADMIN",
    },
  });

  // Create super admin user
  await prisma.user.upsert({
    where: {
      email: "superadmin@pulse.os",
    },
    update: {},
    create: {
      firstName: "Super",
      lastName: "Admin",
      email: "superadmin@pulse.os",
      roleId: superAdminRole.id,
      emailVerified: true,
      status: "ACTIVE",
    },
  });
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
