import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const getRoleAll = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roles = await prisma.role.findMany({
      include: {
        RolePermission: {
          include: {
            permission: {
              select: {
                id: true,
                name: true,
                description: true,
              },
            },
          },
        },
      },
    });

    if (!roles.length) {
      API.notFound(res, "No hay registros de roles");
      return;
    }

    const formattedRoles = roles.map((role) => ({
      id: role.id,
      name: role.name,
      permissions: role.RolePermission.map((rp) => rp.permission),
    }));

    API.success(res, "Roles retrieved successfully", formattedRoles);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
