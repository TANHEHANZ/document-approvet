import { z } from "zod";

export const RolePermissionSchema = z.object({
  roleId: z.string().uuid(),
  permissionId: z.string().uuid(),
});

export const AssignPermissionsSchema = z.object({
  roleId: z.string().uuid(),
  permissionIds: z.array(z.string().uuid()).min(1),
});

export type RolePermissionDto = z.infer<typeof RolePermissionSchema>;
export type AssignPermissionsDto = z.infer<typeof AssignPermissionsSchema>;
