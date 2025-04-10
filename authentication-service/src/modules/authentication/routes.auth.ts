import { Router } from "express";
import passport from "passport";
import { checkPermission } from "../../infraestructure/midlweware/check-permission";
import { API, PERMISSIONS } from "@firma-gamc/shared";
import { getIp } from "../../infraestructure/helpers/getIp";
import { formatUser } from "./controller/method/google";
import { ValidationResult } from "./controller/validation/validated";
import { reponseGoogle } from "./controller/provider/googleStrategy";

const authRouter = Router();

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
  async (req, res, next) => {
    const { profile, validation } = req.user as reponseGoogle;
    const state = JSON.parse(req.query.state as string);
    if (
      !validation.exists &&
      !validation.isActive &&
      !validation.isMethodActive
    ) {
      const newUser = await formatUser({ ...profile?._json, ip: state.ip });
      API.success(res, "Inico de secion correcto ", newUser);
    }
    if (validation.exists) {
      API.success(res, "Usuario ya existente ", validation.user);
    }
  }
);
export default authRouter;
