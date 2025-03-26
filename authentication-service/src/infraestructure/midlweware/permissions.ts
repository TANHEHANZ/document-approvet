import { NextFunction, Request, Response } from "express";
import { API } from "@firma-gamc/shared";

export const checkPermission = (requiredPermissions: string | string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const permissions = Array.isArray(requiredPermissions)
        ? requiredPermissions
        : [requiredPermissions];
      const user = req.user;

      if (!user) {
        return API.unauthorized(res, "Usuario no autenticado");
      }
      if (user.role === "SUPERADMIN") {
        return next();
      }

      const userPermissions = {
        ...user.permissions,
        roleBased: user.permissions?.roleBased || [],
        additional: user.permissions?.additional || [],
      };

      const hasPermission = permissions.some(
        (permission) =>
          userPermissions.roleBased.includes(permission) ||
          userPermissions.additional.includes(permission)
      );

      if (!hasPermission) {
        return API.forbidden(res, "No tienes permisos suficientes");
      }

      if (req.params.id && permissions.some((p) => p.includes("self"))) {
        if (req.params.id !== user.id) {
          return API.forbidden(
            res,
            "No puedes acceder a recursos de otros usuarios"
          );
        }
      }

      next();
    } catch (error) {
      return API.serverError(res, "Error al verificar permisos", error);
    }
  };
};
