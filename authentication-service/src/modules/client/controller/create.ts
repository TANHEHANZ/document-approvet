import { API } from "@shared/index";
import { Request, Response } from "express";
import { prisma } from "@/infraestructure/config/prisma.client";
import { StatusEnum } from "@prisma/client";
export const createClientOAuth = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validatedData = req.body;
    const { scopeId, ...restClientData } = validatedData;

    const existingClient = await prisma.oAuthClient.findFirst({
      where: {
        name: restClientData.name,
      },
    });

    if (existingClient) {
      API.conflict(
        res,
        `OAuth client with name "${restClientData.name}" already exists`
      );
      return;
    }

    const existingScopes = await prisma.scope.findMany({
      where: {
        id: {
          in: scopeId,
        },
      },
    });

    if (existingScopes.length !== scopeId.length) {
      API.badRequest(res, `One or more scopes not found`);
      return;
    }

    const client = await prisma.oAuthClient.create({
      data: {
        ...restClientData,
        Status: StatusEnum.ACTIVE,
        oAuthClientScopePermission: {
          create: scopeId.map((scopeId: any) => ({
            scopeId,
          })),
        },
      },
      include: {
        oAuthClientScopePermission: {
          include: {
            scope: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    API.success(res, "OAuth client created successfully", {
      client_id: client.client_id,
      client_secret: client.client_secret,
      name: client.name,
      redirect_uris: client.redirect_uris,
      scopes: client.oAuthClientScopePermission.map((sp) => sp.scope.name),
    });
  } catch (error) {
    console.error("OAuth Client Creation Error:", error);
    API.serverError(res, "Failed to create OAuth client");
  }
};
