import { Router } from "express";
import passport from "passport";
import { validate } from "@/infraestructure/midlweware/validated";
import {
  authSchema,
  AuthUserParamsSchema,
} from "@/infraestructure/models/users/auth.dto";
import { manageCallback } from "../user/controller/callback/callback.google";
import { authCi } from "../user/controller/method/ci";
import { authCredential } from "../user/controller/method/credentials";
import { getIp } from "@/infraestructure/helpers/getIp";

const userAuthRoutes = Router();
//  debemos manejar el query de los vatos del cliente segun OAuth02

userAuthRoutes.get(
  "/google",
  validate(AuthUserParamsSchema, "query"),
  (req, res, next) => {
    console.log("req", req.query);
    const ip = getIp(req);
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      state: JSON.stringify({ ip: ip }),
    })(req, res, next);
  }
);

userAuthRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  manageCallback
);
userAuthRoutes.post("/ci", validate(authSchema), authCi);
userAuthRoutes.post("/credential", validate(authSchema), authCredential);

export default userAuthRoutes;
