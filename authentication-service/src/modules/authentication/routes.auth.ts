import { Router } from "express";
import passport from "passport";
import { getIp } from "../../infraestructure/helpers/getIp";
import { manageCallback } from "./controller/callback/callback.google";
import { authCi } from "./controller/method/ci";
import { validate } from "@/infraestructure/midlweware/validated";
import { authSchema } from "@/infraestructure/models/auth.dto";
import { authCredential } from "./controller/method/credentials";

const authRouter = Router();
//  debemos manejar el query de los vatos del cliente segun OAuth02
authRouter.get("/google", (req, res, next) => {
  const ip = getIp(req);
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state: JSON.stringify({ ip: ip }),
  })(req, res, next);
});

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  manageCallback
);
authRouter.post("/ci", validate(authSchema), authCi);
authRouter.post("/credential", validate(authSchema), authCredential);
export default authRouter;
