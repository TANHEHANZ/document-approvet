import { z } from "zod";
import { ROLES } from "@firma-gamc/shared";
import { UserRole } from "@prisma/client";
import { PermissionSchema } from "./permission.dto";

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email().optional(),
  username: z.string().min(3).optional(),
  password: z.string().min(6),
  ci: z.string(),
  role: z.nativeEnum(UserRole).default(ROLES.USER.name),
  systemId: z.string().uuid().optional(),
  statusId: z.string().uuid(),
  permissions: PermissionSchema.default({
    roleBased: [...ROLES.USER.permissions],
    additional: [],
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateUserSchema = UserSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  password: true,
});

export type UserDto = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
