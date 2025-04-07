import express, { Request, Response } from "express";
import cors from "cors";
import auth from "./routes";
import cookieParser from "cookie-parser";
export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(cookieParser())
    .use("/", auth);

  app.get("/", (req: Request, res: Response) => {
    res.json({
      status: "success",
      message: "Authentication Service is running",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};
