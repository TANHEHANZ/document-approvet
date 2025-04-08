import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingRole = await prisma.role.findUnique({
      where: { name: req.body.name },
    });

    if (existingRole) {
      API.conflict(res, "Este rol ya existe");
      return;
    }
    const role = await prisma.role.create({
      data: req.body,
    });

    API.created(res, "Rol creado correctamente", role);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
