import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";
import { createCache } from "@lib/redis/modules/cache";
export const scopeAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.query;
    const scopeCache = createCache();
    const dataCache = await scopeCache.get("scope/all");
    if (dataCache) {
      API.success(res, "Scopes retrieved from cache", dataCache);
      return;
    }

    const scopes = await prisma.scope.findMany({
      where: name ? { name: name as string } : undefined,
      include: {
        ScopeRol: {
          include: {
            permission: {
              select: {
                name: true,
                description: true,
                isActive: true,
              },
            },
          },
        },
      },
    });

    const formattedScopes = scopes
      .map((scope) => {
        const activePermissions = scope.ScopeRol.filter(
          (sr) => sr.permission?.isActive
        ).map((sr) => ({
          name: sr.permission.name,
          description: sr.permission.description,
        }));

        return {
          id: scope.id,
          name: scope.name,
          description: scope.description,
          permissions: activePermissions,
          permissionCount: activePermissions.length,
        };
      })
      .filter((scope) => scope.permissionCount > 0);
    await scopeCache.set("scope/all", formattedScopes);

    API.success(res, "Scopes retrieved successfully", formattedScopes);
  } catch (error) {
    API.serverError(res, "Error retrieving scopes", error);
  }
};
