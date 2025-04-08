import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";
export const allPermissions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const permission = await prisma.permissons.findMany();
    API.success(res, "Permission retrive successfully", permission);
  } catch (error) {
    API.serverError(res, "Error internal server", error);
  }
};
