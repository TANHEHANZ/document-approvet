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

export type AuthInput = z.infer<typeof authSchema>;

export const AuthUserParamsSchema = z
  .object({
    client_id: z.string({
      required_error: "client_id is required",
    }),
    redirect_uri: z
      .string({
        required_error: "redirect_uri is required",
      })
      .url("Invalid redirect URI"),
    response_type: z.enum(["code", "token"]).default("code"),
  })
  .strict();

export type AuthUserParams = z.infer<typeof AuthUserParamsSchema>;
