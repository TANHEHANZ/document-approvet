import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import config from "./config";
import { createUserByGoogle } from "../../modules/users/controllers/createByGoogle";
import { Profile } from "passport-google-oauth20";
import { googleAuthSchema } from "../models/auth.dto";

export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.GOOGLE_CALLBACK_URL,
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile: Profile, done) => {
        try {
          const user = await createUserByGoogle(profile._json);
          return done(null, user);
        } catch (error) {
          console.error("Error during Google authentication", error);
          return done(error, undefined);
        }
      }
    )
  );
};
