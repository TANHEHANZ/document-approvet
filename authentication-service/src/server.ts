import express, { Request, Response } from "express";
import cors from "cors";
import auth from "./routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import { configureGoogleStrategy } from "./modules/authentication/user/controller/provider/googleStrategy";

export const createServer = () => {
  configureGoogleStrategy();
  const app = express();
  app
    .disable("x-powered-by")
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(cookieParser())
    .use(passport.initialize())
    .use("/v1/api/", auth);

  app.get("/", (req: Request, res: Response) => {
    res.json({
      status: "success",
      message: "Authentication Service is running",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};
