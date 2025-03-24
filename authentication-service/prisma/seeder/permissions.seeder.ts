import { prisma } from "../../src/infraestructure/config/prisma.client";
import {
  USER_MANAGEMENT,
  ROLE_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  API_ACCESS,
  SESSIONS,
  INTEGRATIONS,
  AUDIT,
} from "../../src/infraestructure/CONSTANTS";

const permissions = [
  ...Object.values(USER_MANAGEMENT),
  ...Object.values(ROLE_MANAGEMENT),
  ...Object.values(DOCUMENT_MANAGEMENT),
  ...Object.values(API_ACCESS),
  ...Object.values(SESSIONS),
  ...Object.values(INTEGRATIONS),
  ...Object.values(AUDIT),
];

async function seedPermissions() {
  try {
    const existingPermissions = await prisma.permission.findMany();

    if (existingPermissions.length === 0) {
      console.log("Seeding permissions...");

      for (const permission of permissions) {
        await prisma.permission.upsert({
          where: { name: permission },
          update: {},
          create: {
            name: permission,
            description: `Permission for ${permission
              .replace(/_/g, " ")
              .toLowerCase()}`,
          },
        });
      }
      console.log("Permissions seeded successfully.");
    } else {
      console.log("Permissions already exist, skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding permissions:", error);
    throw error;
  }
}

if (require.main === module) {
  seedPermissions()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export { seedPermissions };
