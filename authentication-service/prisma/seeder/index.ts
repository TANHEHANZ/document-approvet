import { seedPermissions } from "./permissions.seeder";
import { prisma } from "../../src/infraestructure/config/prisma.client";
import { seedScopes } from "./scoope.seeder";
import { seedScopePermissions } from "./scope-permission.seeder";
import { seedNavItems } from "./nav.seeder";

async function main() {
  try {
    console.log("Starting database seeding...");
    await seedScopes();
    await seedPermissions();
    await seedScopePermissions();
    await seedNavItems();

    console.log("All seeds completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  }
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
