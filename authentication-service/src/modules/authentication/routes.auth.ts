import { Router } from "express";
import passport from "passport";
import { checkPermission } from "../../infraestructure/midlweware/check-permission";
import { PERMISSIONS } from "@firma-gamc/shared";
import { getIp } from "../../infraestructure/helpers/getIp";

const authRouter = Router();

authRouter.get(
  "/google",
  checkPermission(PERMISSIONS.AUTH.LOGIN_GOOGLE),
  (req, res, next) => {
    const ip = getIp(req);
    passport.authenticate("google", {
      scope: ["profile", "email"],
      session: false,
      state: JSON.stringify({ ip: ip }),
    })(req, res, next);
  }
);

authRouter.get(
  "/google/callback",
  checkPermission(PERMISSIONS.AUTH.LOGIN_GOOGLE),
  passport.authenticate("google", { session: false }),
  async (req, res, next) => {
    const state = JSON.parse(req.query.state as string);
    console.log("Original IP from state:", state.ip);
  }
);
export default authRouter;
