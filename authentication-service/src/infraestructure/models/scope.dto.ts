import { z } from "zod";

export const ScopePermissionSchema = z.object({
  id: z.string().uuid().optional(),
  scopeId: z.string().uuid(),
  permissionId: z.string().uuid(),
});

export const ScopeSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  ScopeRol: z.array(ScopePermissionSchema).optional(),
});
export const CreateScopePermissionSchema = z.object({
  permissionId: z.string().uuid(),
});
export const CreateScopeSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  permissions: z.array(CreateScopePermissionSchema),
});

export type ScopeDTO = z.infer<typeof ScopeSchema>;
export type ScopePermissionDTO = z.infer<typeof ScopePermissionSchema>;
export type CreateScopePermissionDTO = z.infer<
  typeof CreateScopePermissionSchema
>;
