import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.client";
import { API } from "@firma-gamc/shared";
import jwt from "jsonwebtoken";
import { User, UserRole } from "@prisma/client";

interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
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

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
        status: { status: "ACTIVE" },
      },
    });

    if (!user) {
      API.unauthorized(res, "Usuario no válido");
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

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      API.unauthorized(res, "Token expirado");
      return;
    }
    API.unauthorized(res, "Token inválido");
  }
};
