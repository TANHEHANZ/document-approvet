import { z } from "zod";

export const UserRoleSchema = z.object({
  userId: z.string().uuid(),
  roleId: z.string().uuid(),
});

export const AssignRolesSchema = z.object({
  userId: z.string().uuid(),
  roleIds: z.array(z.string().uuid()).min(1),
});

export type UserRoleDto = z.infer<typeof UserRoleSchema>;
export type AssignRolesDto = z.infer<typeof AssignRolesSchema>;
