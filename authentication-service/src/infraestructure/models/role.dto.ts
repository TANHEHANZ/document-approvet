import { z } from "zod";

export const CreateRoleSchema = z.object({
  name: z
    .string()
    .min(3, "Role name must be at least 3 characters")
    .max(50, "Role name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Role name can only contain letters, numbers, underscores and hyphens"
    )
    .transform((val) => val.toUpperCase()),
});

export const UpdateRoleSchema = CreateRoleSchema.partial();

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;

export const RolePermissionSchemaUnique = z.object({
  roleId: z.string().uuid("Invalid role ID format"),
  permissionId: z.string().uuid("Invalid permission ID format"),
});

export const RolePermissionSchema = z.object({
  roleId: z.string().uuid("Invalid role ID format"),
  permissionIds: z
    .array(z.string().uuid("Invalid permission ID format"))
    .min(1, "At least one permission must be provided"),
});

export type AssignPermissionToRoleDto = z.infer<typeof RolePermissionSchema>;
export type AssignMultiplePermissionsDto = z.infer<typeof RolePermissionSchema>;
export type RemovePermissionDto = z.infer<typeof RolePermissionSchema>;
