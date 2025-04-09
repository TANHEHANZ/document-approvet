import { PrismaClient } from "@prisma/client";
import { DEFAULT_SCOPES } from "@firma-gamc/shared/CONSTANTS/scopes";

const prisma = new PrismaClient();

export async function seedScopePermissions() {
  try {
    console.log("Starting scope permissions seeding...");

    for (const [_, scope] of Object.entries(DEFAULT_SCOPES)) {
      // Get the scope
      const dbScope = await prisma.scope.findUnique({
        where: { name: scope.name },
      });

      if (!dbScope) {
        console.log(`Scope ${scope.name} not found, skipping...`);
        continue;
      }

      // Get or create permissions
      for (const permissionName of scope.permissions) {
        const permission = await prisma.permissons.findUnique({
          where: { name: permissionName },
        });

        if (!permission) {
          console.log(`Permission ${permissionName} not found, skipping...`);
          continue;
        }

        // Create scope-permission relationship
        await prisma.scopePermission.upsert({
          where: {
            id: `${dbScope.id}-${permission.id}`,
          },
          update: {},
          create: {
            id: `${dbScope.id}-${permission.id}`,
            scopeId: dbScope.id,
            permissionId: permission.id,
          },
        });

        console.log(
          `Linked scope ${scope.name} with permission ${permissionName}`
        );
      }
    }

    console.log("Scope permissions seeding completed successfully");
  } catch (error) {
    console.error("Error seeding scope permissions:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seedScopePermissions().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
