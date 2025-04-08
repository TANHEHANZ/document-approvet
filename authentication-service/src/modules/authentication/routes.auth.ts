import { Router } from "express";
import passport from "passport";
import { handleAuthResponse } from "../../infraestructure/midlweware/auth.response";
// import { validateClient } from "../../infraestructure/midlweware/client.validator";

const authRouter = Router();

authRouter.get(
  "/google",
  // validateClient,
  (req, res, next) => {
    const { client_id, redirect_uri, state } = req.query;

    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      state: JSON.stringify({ client_id, redirect_uri, state }),
    })(req, res, next);
  }
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false })
  // async (req, res, next) => {
  //   const { state } = req.query;
  //   const { client_id, redirect_uri } = JSON.parse(state as string);

  //   const client = await prisma.oAuthClient.findUnique({
  //     where: { client_id: client_id as string }
  //   });

  //   if (!client || !client.redirect_uris.includes(redirect_uri as string)) {
  //     return res.redirect(`/auth/error?error=invalid_client`);
  //   }

  //   handleAuthResponse(
  //     redirect_uri as string,
  //     `${redirect_uri}/error`
  //   )(req, res, next);
  // }
);
