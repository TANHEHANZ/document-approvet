import { API } from "@shared/index";
import { prisma } from "@/infraestructure/config/prisma.client";
import { Request, Response } from "express";

export const scopeCreate = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, permissions } = req.body;
    const result = await prisma.$transaction(async (tx) => {
      const scope = await tx.scope.create({
        data: {
          name,
          description,
        },
      });
      const scopePermissions = await Promise.all(
        permissions.map(({ permissionId }: any) =>
          tx.scopePermission.create({
            data: {
              scopeId: scope.id,
              permissionId,
            },
          })
        )
      );

      return {
        ...scope,
        permissions: scopePermissions,
      };
    });

    API.success(res, "Scope created successfully", result);
  } catch (error) {
    API.serverError(res, "Error creating scope", error);
  }
};
