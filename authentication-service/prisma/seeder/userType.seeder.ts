// import { prisma } from "../../src/infraestructure/config/prisma.client";

// const userTypes = [
//   {
//     name: "SYSTEM_USER",
//     description:
//       "Usuario del sistema con acceso a funcionalidades administrativas",
//     isActive: true,
//   },
//   {
//     name: "CLIENT_USER",
//     description: "Usuario cliente que consume los servicios",
//     isActive: true,
//   },
// ] as const;

// async function seedUserTypes() {
//   try {
//     const existingUserTypes = await prisma.userType.findMany();

//     if (existingUserTypes.length === 0) {
//       console.log("Seeding user types...");

//       for (const userType of userTypes) {
//         await prisma.userType.upsert({
//           where: { name: userType.name },
//           update: {},
//           create: userType,
//         });
//       }
//       console.log("User types seeded successfully.");
//     } else {
//       console.log("User types already exist, skipping seed.");
//     }
//   } catch (error) {
//     console.error("Error seeding user types:", error);
//     throw error;
//   }
// }

// if (require.main === module) {
//   seedUserTypes()
//     .catch((e) => {
//       console.error(e);
//       process.exit(1);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// }

// export { seedUserTypes };
