import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "@firma-gamc/shared";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });
    if (!existingUser) {
      API.notFound(res, "Usuario no encontrado");
      return;
    }

    if (updateData.email || updateData.ci) {
      const duplicateUser = await prisma.user.findFirst({
        where: {
          OR: [{ email: updateData.email }, { ci: updateData.ci }],
          NOT: { id },
        },
      });

      if (duplicateUser) {
        API.conflict(res, "Email o CI ya existe");
        return;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
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

    API.success(res, "Usuario actualizado correctamente", updatedUser);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
