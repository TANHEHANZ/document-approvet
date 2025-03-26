import { Request, Response } from "express";
import { prisma } from "../../infraestructure/config/prisma.client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { API } from "@firma-gamc/shared";
import config from "../../infraestructure/config/config";
export const createdSeccion = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, ci, clientKey } = req.body;
  if (clientKey) {
    const system = await prisma.system.findUnique({
      where: {
        isActive: true,
        clientKey,
      },
      include: {
        users: {
          where: {
            state: { status: "ACTIVE" },
          },
        },
      },
    });

    if (!system) {
      API.unauthorized(res, "Sistema no autorizado o clave inválida");
      return;
    }
    const token = jwt.sign(
      {
        id: system.id,
        type: "SYSTEM",
        email: null,
        role: "SUPERADMIN",
      },
      config.TOKEN_ACCES!,
      { expiresIn: "365d" }
    );

    API.success(res, "Sistema autenticado", {
      token,
      system: {
        id: system.id,
        name: system.name,
        userCount: system.users.length,
      },
    });
  }

  if (!password || (!email && !ci)) {
    API.badRequest(res, "Credenciales incompletas");
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email || "" }, { ci: ci || "" }],
        state: { status: "ACTIVE" },
      },
      select: {
        id: true,
        password: true,
        role: true,
        email: true,
        ci: true,
        username: true,
        systemId: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      API.unauthorized(res, "Credenciales inválidas");
      return;
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        type: "USER",
      },
      config.TOKEN_ACCES!,
      { expiresIn: "24h" }
    );

    API.success(res, "Login exitoso", token);
  } catch (error) {
    API.serverError(res, "Error en el login", error);
  }
};
