import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.client";

export const validateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { client_id, redirect_uri } = req.query;

  if (!client_id || !redirect_uri) {
    return res.status(400).json({
      error: "invalid_request",
      error_description: "Missing client_id or redirect_uri",
    });
  }

  const client = await prisma.oAuthClient.findUnique({
    where: { client_id: client_id as string },
  });

  if (!client) {
    return res.status(401).json({
      error: "unauthorized_client",
      error_description: "Client not found",
    });
  }

  if (!client.redirect_uris.includes(redirect_uri as string)) {
    return res.status(400).json({
      error: "invalid_redirect_uri",
      error_description: "Redirect URI not registered for this client",
    });
  }

  req.oauth = undefined;
  next();
};
