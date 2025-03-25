import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.client";
import { API } from "../CONSTANTS/permission";
import { ROLE_PERMISSIONS } from "../CONSTANTS/roles";
import { UserRole } from "@prisma/client";

export const hasPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user || !req.userRole) {
        API.unauthorized(res, "Usuario no autenticado");
        return;
      }

      // SuperAdmin has all permissions
      if (req.userRole === UserRole.SUPERADMIN) {
        next();
        return;
      }

      // Check role-based permissions first
      const rolePermissions = ROLE_PERMISSIONS[req.userRole];
      if (rolePermissions.includes(requiredPermission)) {
        next();
        return;
      }

      // Check additional user permissions
      const userPermission = await prisma.userPermission.findFirst({
        where: {
          userId: req.user.id,
          permission: requiredPermission,
          isActive: true,
          systemId: req.user.systemId || null,
        },
      });

      if (userPermission) {
        next();
        return;
      }

      API.forbidden(res, "No tiene permisos suficientes");
    } catch (error) {
      API.serverError(res, "Error al verificar permisos", error);
    }
  };
};
