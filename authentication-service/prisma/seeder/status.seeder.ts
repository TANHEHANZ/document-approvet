import { prisma } from "../../src/infraestructure/config/prisma.client";
import { STATUS } from "../../src/infraestructure/CONSTANTS/status";

async function seedStatuses() {
  try {
    const existingStatuses = await prisma.status.findMany();

    if (existingStatuses.length === 0) {
      console.log("Seeding statuses...");

      for (const status of STATUS) {
        await prisma.status.upsert({
          where: { status: status.status },
          update: {},
          create: {
            status: status.status,
            color: status.color,
          },
        });
      }
      console.log("Status seeding completed successfully.");
    } else {
      console.log("Statuses already exist, skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding statuses:", error);
    throw error;
  }
}

if (require.main === module) {
  seedStatuses()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { seedStatuses };
