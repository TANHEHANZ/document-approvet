import { z } from "zod";
import { UserRole } from "@prisma/client";

export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(50).optional(),
  ci: z.string(),
  password: z.string().min(8).max(100),
  role: z.nativeEnum(UserRole),
  statusId: z.string().uuid(),
  systemId: z.string().uuid().optional(),
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true,
  role: true,
});

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UserSchema = CreateUserSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  system: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string().optional(),
      isActive: z.boolean(),
    })
    .optional(),
  status: z.object({
    id: z.string().uuid(),
    status: z.string(),
    color: z.string(),
  }),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
export type UserDto = z.infer<typeof UserSchema>;
