import { UserRole } from "@prisma/client";
import { AuthPayload } from "./types/jwt";
export {};
declare global {
  namespace Express {
    interface Request {
      user?: User;
      auth?: AuthPayload;
    }
  }
}
