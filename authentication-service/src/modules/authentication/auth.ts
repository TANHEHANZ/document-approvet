import { Request, Response } from "express";
import { prisma } from "../../infraestructure/config/prisma.client";
import { API } from "../../infraestructure/CONSTANTS/permission";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, ci } = req.body;

  if (!password) {
    API.badRequest(res, "Contraseña es requerida");
    return;
  }

  if (!email && !ci) {
    API.badRequest(res, "Email o CI es requerido");
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email || "" }, { ci: ci || "" }],
        status: { status: "ACTIVE" },
      },
      select: {
        id: true,
        password: true,
        role: true,
        email: true,
        ci: true,
        username: true,
      },
    });

    if (!user) {
      API.unauthorized(res, "Credenciales inválidas");
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      API.unauthorized(res, "Credenciales inválidas");
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        rol: user.role,
      },
      process.env.ACCESS_SECRET!,
      { expiresIn: "24h" }
    );

    API.success(res, "Login exitoso", {
      token,
      user: {
        id: user.id,
        email: user.email,
        ci: user.ci,
        username: user.username,
      },
    });
  } catch (error) {
    API.serverError(res, "Error en el login", error);
  }
};
