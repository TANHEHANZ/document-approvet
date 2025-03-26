import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.client";
import { API } from "@firma-gamc/shared";
import jwt from "jsonwebtoken";
import { User, UserRole } from "@prisma/client";
import config from "../config/config";

interface JwtPayload {
  id: string;
  email: string | null;
  role: UserRole;
  type: "USER" | "SYSTEM";
}

interface UserPermissions {
  roleBased: string[];
  additional: string[];
}

type UserWithPermissions = Omit<User, "permissions"> & {
  permissions: UserPermissions;
};

declare global {
  namespace Express {
    interface Request {
      user?: UserWithPermissions;
      userRole?: UserRole;
      type?: "USER" | "SYSTEM";
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      API.unauthorized(res, "Token no proporcionado");
      return;
    }

    try {
      const decoded = jwt.verify(token, config.TOKEN_ACCES!) as JwtPayload;

      if (decoded.type === "SYSTEM") {
        const system = await prisma.system.findUnique({
          where: {
            id: decoded.id,
            isActive: true,
          },
        });

        if (!system) {
          API.unauthorized(res, "Sistema no válido o inactivo");
          return;
        }

        req.type = "SYSTEM";
        next();
        return;
      }

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
          state: { status: "ACTIVE" },
        },
        include: {
          state: true,
        },
      });

      if (!user) {
        API.unauthorized(res, "Usuario no válido o inactivo");
        return;
      }

      const parsedPermissions: UserPermissions =
        typeof user.permissions === "object"
          ? (user.permissions as unknown as UserPermissions)
          : { roleBased: [], additional: [] };

      req.user = {
        ...user,
        permissions: parsedPermissions,
      } as UserWithPermissions;

      req.userRole = user.role;
      req.type = "USER";

      next();
    } catch (verifyError) {
      console.error("Token verification error:", verifyError);
      if (verifyError instanceof jwt.TokenExpiredError) {
        API.unauthorized(res, "Token expirado");
        return;
      }
      API.unauthorized(res, "Token inválido o mal firmado");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    API.serverError(res, "Error en la autenticación");
  }
};
