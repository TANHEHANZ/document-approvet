import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
      },
    });

    if (!user) {
      API.notFound(res, "Usuario no encontrado");
      return;
    }

    API.success(res, "Usuario encontrado", user);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
