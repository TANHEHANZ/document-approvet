import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";
export const removeRolePermissions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roleId, permissionIds } = req.body;

    await prisma.rolePermission.deleteMany({
      where: {
        roleId,
        permissionId: { in: permissionIds },
      },
    });

    const updatedRole = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        RolePermission: {
          include: { permission: true },
        },
      },
    });

    API.success(res, "Permissions removed successfully", updatedRole);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
