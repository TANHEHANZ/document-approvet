import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const updateRolePermissions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { roleId, permissionIds } = req.body;

    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      API.notFound(res, "Role not found");
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({
        where: { roleId },
      });

      if (permissionIds.length > 0) {
        await tx.rolePermission.createMany({
          data: permissionIds.map((permissionId: string) => ({
            roleId,
            permissionId,
          })),
        });
      }
    });

    const updatedRole = await prisma.role.findUnique({
      where: { id: roleId },
      include: {
        RolePermission: {
          include: { permission: true },
        },
      },
    });

    API.success(res, "Role permissions updated successfully", updatedRole);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
