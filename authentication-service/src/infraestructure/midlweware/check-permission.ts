import { Response, NextFunction, RequestHandler } from "express";
import { API } from "@firma-gamc/shared";
import { prisma } from "../config/prisma.client";
export const checkPermission = (requiredPermission: string): RequestHandler => {
  return async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const permission = await prisma.permissons.findFirst({
        where: {
          name: requiredPermission,
          isActive: true,
        },
      });

      if (!permission && requiredPermission !== "*") {
        API.forbidden(res, "Permission not found or inactive");
        return;
      }
      if (req.oauth?.scope) {
        const hasScope = req.oauth.scope.some(
          (scope: any) => scope === requiredPermission || scope === "*"
        );
        if (hasScope) {
          next();
          return;
        }
      }
      const userPermissions = req.user?.Role?.RolePermission || [];
      const hasPermission = userPermissions.some(
        (rp: any) =>
          rp.permission.name === requiredPermission ||
          rp.permission.name === "*"
      );

      if (!hasPermission) {
        API.forbidden(res, "Insufficient permissions");
        return;
      }
      next();
    } catch (error) {
      API.serverError(res, undefined, error);
    }
  };
};
