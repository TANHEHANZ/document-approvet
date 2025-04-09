import { PrismaClient } from "@prisma/client";
import { DEFAULT_SCOPES } from "@firma-gamc/shared/CONSTANTS/scopes";

const prisma = new PrismaClient();

export async function seedScopes() {
  try {
    console.log("Starting scope seeding...");

    for (const [key, scope] of Object.entries(DEFAULT_SCOPES)) {
      const createdScope = await prisma.scope.upsert({
        where: { name: scope.name },
        update: {
          description: scope.description,
        },
        create: {
          name: scope.name,
          description: scope.description,
        },
      });

      console.log(`Seeded scope: ${createdScope.name}`);
    }

    console.log("Scope seeding completed successfully");
  } catch (error) {
    console.error("Error seeding scopes:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedScopes().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
