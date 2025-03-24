import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/prisma.client";
import { API } from "../CONSTANTS";
import jwt from "jsonwebtoken";
import { Session, User } from "@prisma/client";

interface JwtPayload {
  jti: string;
  sub: string;
  type: "access" | "refresh";
}

declare global {
  namespace Express {
    interface Request {
      session?: Session & { user: User };
      user?: User;
    }
  }
}

export class AuthMiddleware {
  private static readonly ACCESS_SECRET = process.env.ACCESS_SECRET!;
  private static readonly REFRESH_SECRET = process.env.REFRESH_SECRET!;

  public static authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token =
        req.cookies?.access_token || req.headers.authorization?.split(" ")[1];

      if (!token) {
        API.unauthorized(res, "No token provided");
        return;
      }

      const decoded = jwt.verify(
        token,
        AuthMiddleware.ACCESS_SECRET
      ) as JwtPayload;

      const session = await prisma.session.findUnique({
        where: {
          id: decoded.jti,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
        include: { user: true },
      });

      if (!session) {
        AuthMiddleware.clearAuthCookies(res);
        API.unauthorized(res, "Invalid session");
        return;
      }

      if (!session.isActive) {
        AuthMiddleware.clearAuthCookies(res);
        API.unauthorized(res, "User account is inactive");
        return;
      }

      req.session = session;
      req.user = session.user;

      if (session.expiresAt.getTime() - Date.now() < 15 * 60 * 1000) {
        await AuthMiddleware.rotateTokens(res, session);
      }

      next();
    } catch (error) {
      AuthMiddleware.clearAuthCookies(res);

      if (error instanceof jwt.TokenExpiredError) {
        return await AuthMiddleware.handleRefreshToken(req, res, next);
      }

      API.unauthorized(res, "Authentication failed");
    }
  };

  private static async handleRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.cookies?.refresh_token;

      if (!refreshToken) {
        API.unauthorized(res, "Refresh token required");
        return;
      }

      const decoded = jwt.verify(
        refreshToken,
        AuthMiddleware.REFRESH_SECRET
      ) as JwtPayload;

      const session = await prisma.session.findUnique({
        where: {
          id: decoded.jti,
          isActive: true,
        },
        include: { user: true },
      });

      if (!session) {
        API.unauthorized(res, "Invalid refresh token");
        return;
      }

      await AuthMiddleware.rotateTokens(res, session);

      req.session = session;
      req.user = session.user;

      next();
    } catch (error) {
      API.unauthorized(res, "Invalid refresh token");
    }
  }

  private static async rotateTokens(
    res: Response,
    session: Session
  ): Promise<void> {
    const accessToken = AuthMiddleware.generateToken(session, "access");
    const refreshToken = AuthMiddleware.generateToken(session, "refresh");

    await prisma.session.update({
      where: { id: session.id },
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    AuthMiddleware.setAuthCookies(res, accessToken, refreshToken);
  }

  private static generateToken(
    session: Session,
    type: "access" | "refresh"
  ): string {
    const secret =
      type === "access"
        ? AuthMiddleware.ACCESS_SECRET
        : AuthMiddleware.REFRESH_SECRET;

    return jwt.sign(
      {
        jti: session.id,
        sub: session.userId,
        type,
      },
      secret,
      { expiresIn: type === "access" ? "15m" : "7d" }
    );
  }

  private static setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string
  ): void {
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  private static clearAuthCookies(res: Response): void {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
  }
}

export const authMiddleware = AuthMiddleware.authenticate;
