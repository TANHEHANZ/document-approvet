import { API } from "@shared/index";
import { Request, Response } from "express";
import { prisma } from "../../../infraestructure/config/prisma.client";

export const checkScopeExists = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.params;
  try {
    const created = await prisma.scope.findFirst({
      where: {
        name: name,
      },
    });
    if (!created) {
      API.success(res, "Scope does not exist", created);
    }
    API.conflict(res, "Scope already exists", created);
  } catch (error) {
    API.serverError(res, "Server error", error);
  }
};
