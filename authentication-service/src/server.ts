import express, { Request, Response } from "express";
import cors from "cors";
import auth from "./routes";

export const createServer = () => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use("/", auth);

/**
 * tengo que ver como manejar la informacion y los tipos de usuarios 
 * creo que puedo tener dos tipos de usuarios 
 * sistemas y usuarios normales
 * pero los sistemas podran usar tambien las servicios
 * el servicio debemos manejamos 
 * 
 */



  app.get("/", (req: Request, res: Response) => {
    res.json({
      status: "success",
      message: "Authentication Service is running",
      timestamp: new Date().toISOString(),
    });
  });

  return app;
};
