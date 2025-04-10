import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const assignRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;
    const role = await prisma.role.findUnique({
      where: { id: data.roleId },
      include: { RolePermission: true },
    });
    if (!role) {
      API.notFound(res, "Role not found");
      return;
    }
    const permissions = await prisma.permissons.findMany({
      where: { AND: [{ id: { in: data.permissionIds } }, { isActive: true }] },
    });
    if (permissions.length !== data.permissionIds.length) {
      API.badRequest(res, "One or more permissions not found or are inactive");
      return;
    }
    const assignedPermissions = await prisma.$transaction(
      data.permissionIds.map((permissionId: string) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: data.roleId,
              permissionId,
            },
          },
          create: {
            roleId: data.roleId,
            permissionId,
          },
          update: {},
        })
      )
    );
    API.success(res, "Roles asignados correctamente", assignedPermissions);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
