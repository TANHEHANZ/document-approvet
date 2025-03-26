import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { hashPassword } from "../../../infraestructure/helpers/bycript";
import { API, ROLES } from "@firma-gamc/shared";
import { UserRole } from "@prisma/client";
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log(req.user);
    console.log(req.userRole);
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ ci: req.body.ci }, { email: req.body.email }],
      },
    });
    if (existingUser) {
      API.conflict(res, "Este usuario ya existe");
      return;
    }
    const userRole = req.body.role as UserRole;
    const rolePermissions = {
      roleBased: [...ROLES[userRole].permissions],
      additional: [],
    };
    const hashedPassword = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
        permissions: rolePermissions,
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
