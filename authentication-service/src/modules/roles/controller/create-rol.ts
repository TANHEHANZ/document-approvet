import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "../../../infraestructure/CONSTANTS";
import {
  ROLE_MANAGEMENT,
  USER_MANAGEMENT,
} from "../../../../../shared/config/permits";

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingRole = await prisma.role.findUnique({
      where: { name: req.body.name },
    });

    if (existingRole) {
      API.conflict(res, "Este rol ya existe");
      return;
    }

    const defaultPermissions = await prisma.permission.findMany({
      where: {
        name: {
          in: [
            USER_MANAGEMENT.USER_READ_SELF,
            USER_MANAGEMENT.USER_UPDATE_SELF,
            ROLE_MANAGEMENT.ROLE_READ,
          ],
        },
      },
    });

    const role = await prisma.$transaction(async (tx) => {
      const newRole = await tx.role.create({
        data: req.body,
      });

      await tx.rolePermission.createMany({
        data: defaultPermissions.map((permission) => ({
          roleId: newRole.id,
          permissionId: permission.id,
        })),
      });
      return tx.role.findUnique({
        where: { id: newRole.id },
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      });
    });

    API.created(res, "Rol creado correctamente", role);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
