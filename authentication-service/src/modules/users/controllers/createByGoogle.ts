import {
  AuthError,
  AuthErrorType,
} from "../../../infraestructure/types/auth.error.type";
import { prisma } from "../../../infraestructure/config/prisma.client";
import { Provider, StatusEnum, User } from "@prisma/client";

const VALID_STATUS: StatusEnum[] = [StatusEnum.ACTIVE, StatusEnum.EXTERNAL];

interface AuthResponse {
  user: User | null;
  error?: AuthError;
}

export const createUserByGoogle = async (
  profile: any
): Promise<AuthResponse> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: profile.email },
      include: { authMethods: true },
    });

    if (existingUser) {
      if (!VALID_STATUS.includes(existingUser.Status)) {
        return {
          user: null,
          error: {
            error: AuthErrorType.ACCESS_DENIED,
            error_description: `Account is ${existingUser.Status.toLowerCase()}. Access denied due to account status.`,
            error_uri: "/docs/errors/account-status",
          },
        };
      }

      const googleAuth = existingUser.authMethods.find(
        (auth) => auth.provider === Provider.GOOGLE
      );

      if (googleAuth) {
        return { user: existingUser };
      } else {
        return {
          user: null,
          error: {
            error: AuthErrorType.INVALID_AUTH_METHOD,
            error_description:
              "Account exists with different authentication method. Please use the original authentication method.",
            error_uri: "/docs/errors/auth-method",
          },
        };
      }
    }

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

    return { user: newUser };
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return {
      user: null,
      error: {
        error: AuthErrorType.SERVER_ERROR,
        error_description:
          "An unexpected error occurred during authentication.",
        error_uri: "/docs/errors/server-error",
      },
    };
  }
};
