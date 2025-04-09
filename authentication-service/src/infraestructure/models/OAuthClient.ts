import { z } from "zod";

export const CreateOAuthClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  redirect_uris: z
    .array(z.string().url("Invalid URL format"))
    .min(1, "At least one redirect URI is required"),
  webhook_url: z.string().url("Invalid webhook URL").optional(),
  domain: z.string().optional(),
  scopeId: z.string().uuid("Invalid scope ID"),
});

export const OAuthClientResponseSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string(),
  client_secret: z.string(),
  name: z.string(),
  description: z.string().optional(),
  redirect_uris: z.array(z.string().url()),
  webhook_url: z.string().url().optional(),
  status: z.string(),
  domain: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
  scopeId: z.string().uuid(),
});

export type CreateOAuthClientDto = z.infer<typeof CreateOAuthClientSchema>;
export type OAuthClientResponseDto = z.infer<typeof OAuthClientResponseSchema>;
