import { prisma } from "../../../infraestructure/config/prisma.client";
import { Provider, StatusEnum, User } from "@prisma/client";

const VALID_STATUS: StatusEnum[] = [StatusEnum.ACTIVE, StatusEnum.EXTERNAL];

export const createUserByGoogle = async (
  profile: any
): Promise<User | null> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: profile.email,
      },
      include: {
        authMethods: true,
      },
    });

    if (existingUser) {
      if (!VALID_STATUS.includes(existingUser.Status)) {
        throw new Error(
          `Account is ${existingUser.Status.toLowerCase()}. Please contact support.`
        );
        return null;
      }

      if (existingUser.Status === StatusEnum.DELETED) {
        throw new Error("cuenta eliminada");
      }

      const googleAuth = existingUser.authMethods.find(
        (auth) => auth.provider === Provider.GOOGLE
      );

      if (googleAuth) {
        return existingUser;
      } else {
        throw new Error(
          "User already exists with different authentication method"
        );
      }
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: profile.email,
          full_name: profile.name,
          photo: profile.picture,
          authMethods: {
            create: {
              provider: Provider.GOOGLE,
              google_id: profile.sub,
            },
          },
        },
      });

      return newUser;
    }
  } catch (error) {
    console.error("Error during Google authentication", error);
    throw error;
  }
};
