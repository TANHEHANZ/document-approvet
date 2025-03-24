import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email().optional(),
  username: z.string().min(3).max(50),
  ci: z.string(),
  password: z.string().min(8).max(100),
  userTypeId: z.string().uuid(),
  statusId: z.string().uuid(),
});

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  password: true,
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
  roles: z
    .array(
      z.object({
        id: z.string().uuid(),
        roleId: z.string().uuid(),
      })
    )
    .optional(),
  sessions: z
    .array(
      z.object({
        id: z.string().uuid(),
        token: z.string(),
        isActive: z.boolean(),
        expiresAt: z.date(),
      })
    )
    .optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
export type UserDto = z.infer<typeof UserSchema>;
