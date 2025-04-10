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

    const scopePermissions = await prisma.scopePermission.findMany({
      where: {
        scopeId: {
          in: scopeId,
        },
      },
    });

    if (!scopePermissions.length) {
      API.badRequest(res, `No permissions found for the provided scopes`);
      return;
    }
    const client = await prisma.oAuthClient.create({
      data: {
        ...restClientData,
        Status: StatusEnum.ACTIVE,
        scopePermissions: {
          create: scopePermissions.map((sp) => ({
            scopePermissionId: sp.id,
          })),
        },
      },
      include: {
        scopePermissions: {
          include: {
            scopePermission: {
              include: {
                permission: true,
                scope: true,
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
      scopes: client.scopePermissions.map((sp) => ({
        scope: sp.scopePermission.scope.name,
        permission: sp.scopePermission.permission.name,
      })),
    });
  } catch (error) {
    console.error("OAuth Client Creation Error:", error);
    API.serverError(res, "Failed to create OAuth client");
  }
};
