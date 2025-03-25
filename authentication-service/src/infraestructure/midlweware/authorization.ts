// import { Request, Response, NextFunction } from "express";
// import { TipoRol } from "@prisma/client";
// import ManageResponse from "../response/api";

// export const hasRole = (allowedRoles: TipoRol[]) => {
//   return async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<void> => {
//     try {
//       if (!req.user?.rol) {
//         ManageResponse.unauthorized(
//           res,
//           "No tiene permisos para acceder a esta ruta"
//         );
//         return;
//       }

//       if (allowedRoles.includes(req.user.rol)) {
//         next();
//         return;
//       }

//       ManageResponse.forbidden(
//         res,
//         "No tiene los permisos necesarios para acceder a esta ruta"
//       );
//       return;
//     } catch (error) {
//       ManageResponse.serverError(res, "Error al validar permisos");
//       return;
//     }
//   };
// };
