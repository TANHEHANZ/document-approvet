import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import config from "../../../../infraestructure/config/config";
import { prisma } from "../../../../infraestructure/config/prisma.client";
import { Provider } from "@prisma/client";

interface GoogleProfile {
  id: string;
  displayName: string;
  emails?: { value: string; verified: boolean }[];
  photos?: { value: string }[];
}

export const createUserGoogle = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile: GoogleProfile, done) => {
        try {
          console.log(profile);

          return done(null, profile);
        } catch (error) {
          console.error("Google authentication error:", error);
          return done(error as Error, undefined);
        }
      }
    )
  );
};
