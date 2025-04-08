import { z } from "zod";
import { Provider, StatusEnum } from "@prisma/client";

export const CreateUserSchema = z.object({
  lastIp: z.string(),
  roleId: z.string().uuid("Invalid role ID format").optional(),
  authMethod: z.object({
    provider: z.nativeEnum(Provider),
    password: z.string().min(6).optional(),
    google_id: z.string().optional(),
    ci_number: z.string().optional(),
    phone: z.string().optional(),
    photo: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    verified: z.boolean().default(false).optional(),
    extra_data: z.record(z.any()).optional(),
  }),
  status: z.nativeEnum(StatusEnum).default(StatusEnum.ACTIVE).optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
