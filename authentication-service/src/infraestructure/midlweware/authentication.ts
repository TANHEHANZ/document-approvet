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

declare global {
  namespace Express {
    interface Request {
      user?: User;
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

    req.user = user;
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
