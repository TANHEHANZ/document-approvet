import { z } from "zod";

export const PermissionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(200),
  isActive: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type PermissionDto = z.infer<typeof PermissionSchema>;
