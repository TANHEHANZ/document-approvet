import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
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
        state: {
          select: {
            status: true,
            color: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    API.success(res, "Usuarios obtenidos correctamente", users);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
