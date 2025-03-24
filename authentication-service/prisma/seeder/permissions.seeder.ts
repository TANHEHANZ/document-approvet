import { PrismaClient } from "@prisma/client";
import {
  USER_MANAGEMENT,
  ROLE_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  API_ACCESS,
  SESSIONS,
  INTEGRATIONS,
  AUDIT,
} from "../../src/commands/CONSTANTS";

const prisma = new PrismaClient();

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
}

seedPermissions()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
