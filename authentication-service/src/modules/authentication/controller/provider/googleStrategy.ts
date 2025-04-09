import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import config from "../../../../infraestructure/config/config";
import { Profile } from "passport-google-oauth20";
import { createUserByGoogle } from "../method/google";
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
          //   const state = req.query.state
          //     ? JSON.parse(req.query.state as string)
          //     : {};
          //   console.log("IP from state:", state.ip);
          //   const user = await createUserByGoogle({
          //     ...profile._json,
          //     ip: state.ip,
          //   });
          return done(null, profile);
        } catch (error) {
          console.error("Error during Google authentication", error);
          return done(error, undefined);
        }
      }
    )
  );
};
