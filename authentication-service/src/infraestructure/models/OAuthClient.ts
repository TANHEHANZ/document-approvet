import { z } from "zod";

export const CreateOAuthClientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  redirect_uris: z
    .array(z.string().url("Invalid URL format"))
    .min(1, "At least one redirect URI is required"),
  webhook_url: z.string().url("Invalid webhook URL").optional(),
  domain: z.string().optional(),
  scopeId: z
    .array(z.string().uuid("Invalid scope ID"))
    .min(1, "At least one scope is required"),
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

export const QueryParamsOAuthClient = z
  .object({
    name: z
      .string()
      .optional()
      .transform((val) => val || undefined),
    status: z
      .enum(["ACTIVE", "INACTIVE", "DEACTIVATED"])
      .optional()
      .transform((val) => {
        if (!val) return undefined;
        return ["ACTIVE", "INACTIVE", "DEACTIVATED"].includes(val)
          ? val
          : undefined;
      }),
    domain: z
      .string()
      .optional()
      .transform((val) => val || undefined),
    client_id: z
      .string()
      .optional()
      .transform((val) => val || undefined),
    createdAt: z
      .object({
        from: z.string().datetime().optional(),
        to: z.string().datetime().optional(),
      })
      .optional()
      .transform((val) => {
        if (!val?.from && !val?.to) return undefined;
        return {
          from: val?.from ? new Date(val.from) : undefined,
          to: val?.to ? new Date(val.to) : undefined,
        };
      }),
  })
  .strict();

export type CreateOAuthClientDto = z.infer<typeof CreateOAuthClientSchema>;
export type OAuthClientResponseDto = z.infer<typeof OAuthClientResponseSchema>;

//  filter params

export type QueryParamsOAuthClientDTO = z.infer<typeof QueryParamsOAuthClient>;
