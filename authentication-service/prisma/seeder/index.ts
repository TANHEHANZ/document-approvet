// import { seedPermissions } from "./permissions.seeder";
// import { seedStatuses } from "./status.seeder";
import { prisma } from "../../src/infraestructure/config/prisma.client";
// import { seedUserTypes } from "./userType.seeder";

async function main() {
  try {
    console.log("Starting database seeding...");
    // await seedUserTypes();
    // await seedStatuses();
    // await seedPermissions();

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
