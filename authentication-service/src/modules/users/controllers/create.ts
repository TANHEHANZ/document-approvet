import { prisma } from "../../../infraestructure/config/prisma.client";
import { hashPassword } from "../../../infraestructure/helpers/bycript";
import { CreateUserDto } from "../../../infraestructure/models/user.dto";
import { Provider, StatusEnum, User } from "@prisma/client";

export interface PropCreate {
  userData: CreateUserDto;
  provider: Provider;
}
const ALLOWED_STATUSES = [
  StatusEnum.ACTIVE,
  StatusEnum.EXTERNAL,
] as StatusEnum[];
export const createUser = async ({
  userData,
  provider,
}: PropCreate): Promise<User | null> => {
  try {
    console.log(provider);
    const existingUser = await prisma.user.findFirst({
      where: {
        authMethods: {
          some: {
            OR: [
              {
                AND: [
                  { provider: Provider.GOOGLE },
                  { google_id: userData.authMethod.google_id },
                  { email: userData.authMethod.email },
                ],
              },
              {
                AND: [
                  { provider: Provider.CREDENTIALS },
                  { email: userData.authMethod.email },
                ],
              },
              {
                AND: [
                  { provider: Provider.CI },
                  { ci_number: userData.authMethod.ci_number },
                ],
              },
            ],
          },
        },
      },
      include: {
        authMethods: {
          omit: { password: true },
        },
      },
    });

    if (existingUser) {
      if (!ALLOWED_STATUSES.includes(existingUser.Status)) {
        return null;
      }
      return existingUser;
    }
    console.log(existingUser);

    const userWithEmail = await prisma.user.findFirst({
      where: {
        authMethods: {
          some: {
            email: userData.authMethod.email,
          },
        },
      },
    });

    if (userWithEmail && !ALLOWED_STATUSES.includes(userWithEmail.Status)) {
      return null;
    }

    const baseUserData = {
      lastIp: userData.lastIp,
      Status: StatusEnum.ACTIVE,
      roleId: userData.roleId,
    };

    const authMethodData = {
      provider,
      ...(provider === Provider.GOOGLE && {
        email: userData.authMethod.email,
        photo: userData.authMethod.photo,
        verified: userData.authMethod.verified,
        google_id: userData.authMethod.google_id,
      }),
      ...(provider === Provider.CREDENTIALS && {
        email: userData.authMethod.email,
        password: await hashPassword(userData.authMethod.password!),
      }),
      ...(provider === Provider.CI && {
        ci_number: userData.authMethod.ci_number,
        password: await hashPassword(userData.authMethod.password!),
      }),
    };

    const user = await prisma.user.create({
      data: {
        ...baseUserData,
        authMethods: {
          create: authMethodData,
        },
      },
      include: {
        authMethods: {
          omit: {
            password: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
