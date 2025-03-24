import { z } from "zod";

export const RoleSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(200),
  statusId: z.string().uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type RoleDto = z.infer<typeof RoleSchema>;
