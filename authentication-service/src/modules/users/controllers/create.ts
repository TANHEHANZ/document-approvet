import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { API } from "../../../infraestructure/CONSTANTS/permission";
import { hashPassword } from "../../../infraestructure/helpers/bycript";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ ci: req.body.ci }, { email: req.body.email }],
      },
    });
    if (existingUser) {
      API.conflict(res, "Este usuario ya existe");
      return;
    }
    const hashedPassword = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        ci: true,
        role: true,
        statusId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    API.created(res, "Usuario creado correctamente", user);
  } catch (error) {
    API.serverError(res, undefined, error);
  }
};
