import { API } from "@shared/index";
import { Request, Response } from "express";
import { prisma } from "@/infraestructure/config/prisma.client";
import { QueryParamsOAuthClientDTO } from "@/infraestructure/models/client/OAuthClient";

export const getAllClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, client_id, createdAt, domain, status } =
      req.query as QueryParamsOAuthClientDTO;
    const clients = await prisma.oAuthClient.findMany({
      where: {
        name: name ? { contains: name, mode: "insensitive" } : undefined,
        Status: status || undefined,
        domain: domain ? { contains: domain, mode: "insensitive" } : undefined,
        client_id: client_id || undefined,
        created_at:
          createdAt?.from || createdAt?.to
            ? {
                gte: createdAt?.from ? new Date(createdAt.from) : undefined,
                lte: createdAt?.to ? new Date(createdAt.to) : undefined,
              }
            : undefined,
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
      orderBy: {
        created_at: "desc",
      },
    });

    API.success(res, "Clients retrieved successfully", clients);
  } catch (error) {
    console.error("Get Clients Error:", error);
    API.serverError(res, "Failed to retrieve clients");
  }
};
