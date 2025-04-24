import express, { Request, Response } from "express";
import cors from "cors";
import auth from "./routes";
import cookieParser from "cookie-parser";
import passport from "passport";
import { configureGoogleStrategy } from "./modules/authentication/user/controller/provider/googleStrategy";
import path from "path";
import compression from "compression";
export const createServer = () => {
  configureGoogleStrategy();
  const app = express();
  app
    .disable("x-powered-by")
    .use(compression())
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(cookieParser())
    .use(passport.initialize())
    .use(
      "/static",
      express.static(path.join(__dirname, "public"), {
        maxAge: "1d",
        etag: true,
        lastModified: true,
        index: false,
        dotfiles: "ignore",
        immutable: true,
      })
    )
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
