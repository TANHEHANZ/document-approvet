import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "../../../infraestructure/CONSTANTS/permission";

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      API.notFound(res, "Usuario no encontrado");
      return;
    }

    // Soft delete by updating status
    const deletedUser = await prisma.user.update({
      where: { id },
      data: {
        status: {
          connect: {
            status: "DELETED",
          },
        },
      },
    });

    API.success(res, "Usuario eliminado correctamente", deletedUser);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
