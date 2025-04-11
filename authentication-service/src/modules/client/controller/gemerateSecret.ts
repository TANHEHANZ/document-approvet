import { generateClientCredentials } from "@/infraestructure/helpers/encript";
import { API } from "@shared/index";
import { Request, Response } from "express";
import { prisma } from "@/infraestructure/config/prisma.client";
export const generateSecretClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const idClient = req.params.idClient as string;
    if (!idClient) {
      API.badRequest(res, "error no se proveyo el id del cliente");
      return;
    }
    const existingClient = await prisma.oAuthClient.findUnique({
      where: { id: idClient },
    });

    if (!existingClient) {
      API.notFound(res, "Cliente no encontrado");
      return;
    }
    const credentials = await generateClientCredentials();
    const asiggnCredential = await prisma.oAuthClient.update({
      where: {
        id: idClient,
      },
      data: {
        client_id: credentials.clientId,
        client_secret: credentials.hashedSecret,
      },
      select: {
        client_id: true,
        client_secret: true,
      },
    });

    API.success(res, "Credentials generated and verified", asiggnCredential);
  } catch (error) {
    console.error("Credential Generation Error:", error);
    API.serverError(res, "Failed to generate credentials");
  }
};
