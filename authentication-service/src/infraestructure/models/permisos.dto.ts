import { z } from "zod";
import { PERMISSIONS } from "@firma-gamc/shared";

export const BASE_PERMISSIONS = {
  USER: [
    PERMISSIONS.USER.SELF_MANAGE,
    PERMISSIONS.USER.SELF_READ,
    PERMISSIONS.USER.SELF_UPDATE,
  ],
  ADMIN: [
    PERMISSIONS.USER.ALL,
    PERMISSIONS.DOCUMENT.ALL,
    PERMISSIONS.REPORT.ALL,
    PERMISSIONS.AUDIT.ALL,
  ],
  SERVICE: [PERMISSIONS.AUTH.TOKEN.VALIDATE, PERMISSIONS.AUTH.TOKEN.GENERATE],
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
