import { z } from "zod";
import { PERMISSIONS } from "../CONSTANTS/permission";

export const BASE_PERMISSIONS = {
  USER: [
    PERMISSIONS.USER_MANAGEMENT.USER_READ_SELF,
    PERMISSIONS.USER_MANAGEMENT.USER_UPDATE_SELF,
    PERMISSIONS.SESSIONS.SESSION_MANAGE_SELF,
  ],
  ADMIN: [
    ...Object.values(PERMISSIONS.USER_MANAGEMENT),
    ...Object.values(PERMISSIONS.ROLE_MANAGEMENT),
    PERMISSIONS.SESSIONS.SESSION_MANAGE_ALL,
  ],
  SERVICE: [
    PERMISSIONS.API_ACCESS.API_READ_PUBLIC,
    PERMISSIONS.API_ACCESS.API_READ_PROTECTED,
  ],
} as const;

export const PermissionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3),
  description: z.string(),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type PermissionDto = z.infer<typeof PermissionSchema>;
export type BasePermissionType = keyof typeof BASE_PERMISSIONS;
