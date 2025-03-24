import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "../../../infraestructure/CONSTANTS";

export const assignRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, roleIds } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      API.notFound(res, "Usuario no encontrado");
      return;
    }

    const roles = await prisma.role.findMany({
      where: { id: { in: roleIds } },
    });

    if (roles.length !== roleIds.length) {
      API.notFound(res, "Uno o más roles no encontrados");
      return;
    }

    const assignedRoles = await prisma.$transaction(async (tx) => {
      await tx.userRole.deleteMany({
        where: { userId },
      });

      await tx.userRole.createMany({
        data: roleIds.map((roleId: string) => ({
          userId,
          roleId,
        })),
      });

      return tx.user.findUnique({
        where: { id: userId },
        include: {
          roles: {
            include: {
              role: true,
            },
          },
        },
      });
    });

    API.success(res, "Roles asignados correctamente", assignedRoles);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
