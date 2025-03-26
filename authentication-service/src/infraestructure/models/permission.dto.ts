import { z } from "zod";
import { PERMISSIONS, ROLES } from "@firma-gamc/shared";

export const PermissionSchema = z
  .object({
    roleBased: z.array(
      z
        .string()
        .refine((val): val is Permission =>
          Object.values(PERMISSIONS).some((group) =>
            Object.values(group).includes(val)
          )
        )
    ),
    additional: z.array(z.string()),
  })
  .strict();

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS][keyof (typeof PERMISSIONS)[keyof typeof PERMISSIONS]];
