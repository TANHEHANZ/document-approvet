import {
  AuthError,
  AuthErrorType,
} from "../../../../infraestructure/types/auth.error.type";
import { Provider, StatusEnum, User } from "@prisma/client";
import { createUser } from "../../../users/controllers/create";

interface AuthResponse {
  user: User | null;
  error?: AuthError;
}

export const createUserByGoogle = async (
  profile: any
): Promise<AuthResponse> => {
  try {
    const userData = {
      authMethod: {
        email: profile.email,
        google_id: profile.sub,
        verified: true,
        photo: profile.picture,
      },
      lastIp: "192.168.220.119",
      roleId: process.env.DEFAULT_ROLE_ID,
    };

    const user = await createUser({
      userData,
      provider: Provider.GOOGLE,
    });

    if (!user) {
      return {
        user: null,
        error: {
          error: AuthErrorType.INVALID_AUTH_METHOD,
          error_description:
            "Unable to create or find user with Google credentials",
          error_uri: "/docs/errors/auth-method",
        },
      };
    }

    return { user };
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
