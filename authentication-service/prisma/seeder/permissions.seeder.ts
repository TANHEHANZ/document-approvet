// import { prisma } from "../../src/infraestructure/config/prisma.client";
// import { PERMISSIONS } from "../../src/infraestructure/CONSTANTS/permissions";

// const getAllPermissions = () => {
//   const permissions: string[] = [];

//   Object.values(PERMISSIONS).forEach((domain) => {
//     if (typeof domain === "object") {
//       Object.values(domain).forEach((permission) => {
//         if (typeof permission === "string") {
//           permissions.push(permission);
//         } else if (typeof permission === "object") {
//           // Handle nested permissions (like AUTH.TOKEN)
//           Object.values(permission).forEach((nestedPermission) => {
//             if (typeof nestedPermission === "string") {
//               permissions.push(nestedPermission);
//             }
//           });
//         }
//       });
//     }
//   });

//   return permissions;
// };

// async function seedPermissions() {
//   try {
//     const existingPermissions = await prisma.permission.findMany();
//     const allPermissions = getAllPermissions();

//     if (existingPermissions.length === 0) {
//       console.log("Seeding permissions...");

//       for (const permission of allPermissions) {
//         const [domain, action, subAction] = permission.split(":");
//         const description = subAction
//           ? `Permission to ${action} ${subAction} in ${domain}`
//           : `Permission to ${action} in ${domain}`;

//         await prisma.permission.upsert({
//           where: { name: permission },
//           update: {},
//           create: {
//             name: permission,
//             description: description,
//             isActive: true,
//           },
//         });
//       }
//       console.log("Permissions seeded successfully.");
//     } else {
//       console.log("Permissions already exist, skipping seed.");
//     }
//   } catch (error) {
//     console.error("Error seeding permissions:", error);
//     throw error;
//   }
// }

// if (require.main === module) {
//   seedPermissions()
//     .catch((e) => {
//       console.error(e);
//       process.exit(1);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
// }

// export { seedPermissions };
