import { User } from "@prisma/client";
import { AuthPayload } from "./types/jwt";
import { OAuthClient } from "./types/oauth.types";
import { AuthenticationContext } from "./types/internal.types";

export {};
declare global {
  namespace Express {
    interface Request {
      user?: User;
      auth?: AuthPayload;
      oauth?: {
        client: OAuthClient;
        context?: AuthenticationContext;
      };
    }
  }
}
