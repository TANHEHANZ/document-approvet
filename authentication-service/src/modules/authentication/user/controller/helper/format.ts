import {
  AuthError,
  AuthErrorType,
} from "@/infraestructure/types/auth.error.type";
import { Provider, User } from "@prisma/client";
import { createUser, PropCreate } from "@/modules/users/controllers/create";

interface AuthResponse {
  user: User | null;
  error?: AuthError;
}

export const formatUser = async (
  profile: any,
  provider: Provider
): Promise<AuthResponse> => {
  console.log(profile);
  try {
    const userData: PropCreate = {
      provider: provider,
      userData: {
        lastIp: profile.ip,
        authMethod: {
          email: profile.email,
          google_id: profile.sub,
          verified: true,
          photo: profile.picture,
          extra_data: profile,
          provider: provider,
        },
      },
    };

    const user = await createUser(userData);
    return { user };
  } catch (error) {
    return {
      user: null,
      error: {
        error: AuthErrorType.SERVER_ERROR,
        error_description: "Error creating user with Google profile",
        error_uri: "/docs/errors/server-error",
      },
    };
  }
};
