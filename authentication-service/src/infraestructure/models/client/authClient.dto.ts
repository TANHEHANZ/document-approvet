import { z } from "zod";

export const AuthClientQuerySchema = z
  .object({
    client_id: z
      .string()
      .regex(/^client_[a-f0-9]{32}$/, "Invalid client_id format"),
    client_secret: z
      .string()
      .regex(/^secret_[A-Za-z0-9_-]+$/, "Invalid client_secret format"),
  })
  .strict();

export type AuthClientQueryDTO = z.infer<typeof AuthClientQuerySchema>;
