import { Prisma, User, Role, RolePermission, Permissons } from "@prisma/client";
import { AuthPayload } from "./types/jwt";
import { OAuthClient } from "./types/oauth.types";
import { AuthenticationContext } from "./types/internal.types";

export {};
declare global {
  namespace Express {
    interface Request {
      user?: User & {
        Role?: Role & {
          RolePermission?: (RolePermission & {
            permission: Permissons;
          })[];
        };
      };
      auth?: AuthPayload;
      oauth?: {
        client: OAuthClient;
        context?: AuthenticationContext;
        scope?: string[];
      };
    }
  }
}
