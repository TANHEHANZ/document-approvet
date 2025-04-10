import { Profile } from "passport-google-oauth20";
import { prisma } from "@/infraestructure/config/prisma.client";
import { Provider, StatusEnum, User } from "@prisma/client";

const ALLOWED_STATUSES = [
  StatusEnum.ACTIVE,
  StatusEnum.EXTERNAL,
] as StatusEnum[];

export interface ValidationResult {
  exists: boolean;
  isActive: boolean;
  isMethodActive: boolean;
  methodAuth: Provider;
  user: Profile | null;
  error?: string;
}

export const validateUser = async (
  profile: any,
  provider: Provider
): Promise<ValidationResult> => {
  const providerConditions = {
    [Provider.GOOGLE]: {
      google_id: profile.id,
      email: profile.emails?.[0]?.value || profile._json?.email,
    },
    [Provider.CREDENTIALS]: {
      email: profile.email,
    },
    [Provider.CI]: {
      ci_number: profile.ci,
    },
  };
  const conditions = providerConditions[provider];
  const existingUser = await prisma.user.findFirst({
    where: {
      authMethods: {
        some: {
          AND: [
            { provider },
            ...Object.entries(conditions).map(([key, value]) => ({
              [key]: value,
            })),
          ].filter((condition) => Object.values(condition)[0] !== undefined),
        },
      },
    },
    include: {
      authMethods: {
        where: { provider },
      },
      Role: {
        include: {
          RolePermission: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!existingUser) {
    return {
      exists: false,
      isActive: false,
      isMethodActive: false,
      user: profile,
      methodAuth: provider,
    };
  }

  const isActive = ALLOWED_STATUSES.includes(existingUser.Status);
  const authMethod = existingUser.authMethods[0];
  const isMethodActive = authMethod && authMethod.Status === StatusEnum.ACTIVE;

  let error: string | undefined;
  if (!isActive) {
    error = "User account is not active";
  } else if (!isMethodActive) {
    error = "Authentication method is not active";
  }
  return {
    exists: true,
    isActive,
    isMethodActive,
    user: null,
    error,
    methodAuth: provider,
  };
};
