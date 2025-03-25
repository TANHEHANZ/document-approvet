import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "../../../infraestructure/CONSTANTS/permission";
// este mtetodo funciona pero debemos remplazarlo con la conexion de mediante web socket
export const assignPerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  // try {
  //   const { roleId, permissionIds } = req.body;
  //   const role = await prisma.role.findUnique({
  //     where: { id: roleId },
  //     include: {
  //       permissions: true,
  //     },
  //   });
  //   if (!role) {
  //     API.notFound(res, "Rol no encontrado");
  //     return;
  //   }
  //   const existingPermissions = await prisma.permission.findMany({
  //     where: {
  //       id: {
  //         in: permissionIds,
  //       },
  //     },
  //   });
  //   if (existingPermissions.length !== permissionIds.length) {
  //     API.badRequest(res, "Uno o más permisos no existen");
  //     return;
  //   }
  //   const updatedRole = await prisma.$transaction(async (tx) => {
  //     await tx.rolePermission.deleteMany({
  //       where: { roleId },
  //     });
  //     await tx.rolePermission.createMany({
  //       data: existingPermissions.map((permission) => ({
  //         roleId,
  //         permissionId: permission.id,
  //       })),
  //     });
  //     return tx.role.findUnique({
  //       where: { id: roleId },
  //       include: {
  //         permissions: {
  //           include: {
  //             permission: true,
  //           },
  //         },
  //       },
  //     });
  //   });
  //   API.success(res, "Permisos asignados correctamente", updatedRole);
  // } catch (error) {
  //   API.serverError(res, undefined, error);
  // }
};
