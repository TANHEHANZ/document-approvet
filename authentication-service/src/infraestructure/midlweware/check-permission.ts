import { Request, Response, NextFunction, RequestHandler } from "express";
import { API } from "@firma-gamc/shared";

export const checkPermission = (requiredPermission: string): RequestHandler => {
  return async (req: any, res: Response, next: NextFunction): Promise<void> => {
    try {
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
