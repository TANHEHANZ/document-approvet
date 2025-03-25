// import { Request, Response } from "express";
// import { prisma } from "../../../infraestructure/config/prisma.client";
// import { API } from "../../../infraestructure/CONSTANTS";

// export const getRoleAll = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const role = await prisma.role.findMany({
//       include: {
//         status: true,
//         permissions: {
//           include: {
//             permission: true,
//           },
//         },
//         users: {
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 username: true,
//                 email: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     if (!role) {
//       API.notFound(res, "Rol no encontrado");
//       return;
//     }

//     API.success(res, "Rol encontrado", role);
//   } catch (error) {
//     API.serverError(res, undefined, error);
//   }
// };
