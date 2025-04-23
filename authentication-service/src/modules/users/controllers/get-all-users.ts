import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        Role: true,
        authMethods: {
          omit: {
            password: false,
          },
        },
      },
    });
    if (users.length === 0) {
      API.conflict(res, "No se encontraron usuarios");
      return;
    }

    API.success(res, "Usuarios obtenidos correctamente", users);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
