import { Request, Response } from "express";
import { v4 as uuidGenerate } from "uuid";
import crypto from "crypto";

interface DocumentRequest {
  documento: string; // documento en base64
  descripcion: string;
  token: string;
}

export const verifyDocument = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { documento, descripcion, token } = req.body;

    const idTramite = uuidGenerate();

    // Calculate document hash
    const hashDocumento = crypto
      .createHash("sha256")
      .update(documento)
      .digest("hex");

    res.status(200).json({
      tipoDocumento: "PDF",
      documento: documento,
      hashDocumento: hashDocumento,
      idTramite: idTramite,
      descripcion: descripcion,
      token: token,
    });
  } catch (error) {
    console.error("Error processing document:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
