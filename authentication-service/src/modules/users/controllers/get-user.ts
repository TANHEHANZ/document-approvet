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
        email: true,
        username: true,
        ci: true,
        role: true,
        system: {
          select: {
            id: true,
            name: true,
          },
        },
        status: {
          select: {
            status: true,
            color: true,
          },
        },
        createdAt: true,
        updatedAt: true,
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
