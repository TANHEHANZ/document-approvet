import { Router } from "express";
import passport from "passport";

const authRouter = Router();
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // redirecciona aca si falla la autenticacion
    session: false,
  }),
  (req, res) => {
    console.log("respuesta:", req.user);
    res.redirect("/");
  }
);

authRouter.post("/credentials");
authRouter.post("/ci");

export default authRouter;
