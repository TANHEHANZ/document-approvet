import { z } from "zod";
import { Provider } from "@prisma/client";

const baseAuthSchema = z.object({
  provider: z.nativeEnum(Provider),
});

const credentialsSchema = baseAuthSchema.extend({
  provider: z.literal(Provider.CREDENTIALS),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const googleAuthSchema = baseAuthSchema.extend({
  provider: z.literal(Provider.GOOGLE),
  google_id: z.string(),
  email: z.string().email("Invalid email format").optional(),
  full_name: z.string().optional(),
  photo: z.string().url().optional(),
});

const ciAuthSchema = baseAuthSchema.extend({
  provider: z.literal(Provider.CI),
  ci_number: z
    .string()
    .min(6, "CI number should be at least 6 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const authSchema = z.discriminatedUnion("provider", [
  credentialsSchema,
  googleAuthSchema,
  ciAuthSchema,
]);

export const authResponseSchema = z.object({
  tokens: z.object({
    access_token: z.string(),
    refresh_token: z.string(),
    token_type: z.literal("Bearer"),
    expires_in: z.number(),
    id_token: z.string().optional(),
    scope: z.string().optional(),
  }),
});

export const tokenRefreshResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("Bearer"),
  expires_in: z.number(),
  scope: z.string().optional(),
});

export type AuthInput = z.infer<typeof authSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type TokenRefreshResponse = z.infer<typeof tokenRefreshResponseSchema>;
