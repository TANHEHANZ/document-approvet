import { createPrivateKey, privateDecrypt, constants } from "crypto";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const MASTER_PRIVATE_KEY = createPrivateKey(
  fs.readFileSync(path.join(__dirname, "../../../master_private.pem"))
);

export const decryptToken = async (token: string) => {
  try {
    const decoded = jwt.decode(token, { complete: true }) as any;

    if (!decoded || !decoded.payload || !decoded.payload.data) {
      throw new Error("Invalid token format");
    }

    const decryptedPayload = privateDecrypt(
      {
        key: MASTER_PRIVATE_KEY,
        padding: constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(decoded.payload.data, "base64")
    );

    const payload = JSON.parse(decryptedPayload.toString());

    return payload;
  } catch (error) {
    console.error("Token decryption failed:", error);
    throw new Error("Invalid token");
  }
};
