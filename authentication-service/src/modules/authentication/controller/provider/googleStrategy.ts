import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import config from "../../../../infraestructure/config/config";
import { Profile } from "passport-google-oauth20";
import { validateUser, ValidationResult } from "../validation/validated";
import { Provider } from "@prisma/client";
import { AuthErrorHandler } from "../validation/authErrorHandler";

export interface reponseGoogle {
  profile: Profile | null;
  validation: ValidationResult;
}

export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile: Profile, done) => {
        try {
          const validation = await validateUser(profile, Provider.GOOGLE);
          const error = AuthErrorHandler.handleValidationError(validation);

          if (error) {
            return done(error, false);
          }

          const response = {
            profile: validation.user,
            validation,
          } as reponseGoogle;

          return done(null, response);
        } catch (error) {
          console.error("Error during Google authentication", error);
          return done(error, undefined);
        }
      }
    )
  );
};
