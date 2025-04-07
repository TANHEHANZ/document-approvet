import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { API } from "@firma-gamc/shared";
import { AuthPayload } from "../types/jwt";
import config from "../config/config";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      API.unauthorized(res, "Token no proporcionado");
      return;
    }
    const secret = config.JWT_SECRET;
    const decoded = jwt.verify(token, secret) as AuthPayload;
    req.auth = decoded;
    next();
  } catch (error: any) {
    console.error("Error en el middleware de autenticación:", error);
    if (error.name === "TokenExpiredError") {
      API.unauthorized(res, "Token expirado");
    } else {
      API.unauthorized(res, "Token inválido");
    }
  }
};
