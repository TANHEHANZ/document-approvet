import express, { Request, Response, Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../config/config";

const v1: Router = express.Router();

v1.use(
  "/auth",
  createProxyMiddleware({
    target: config.services.auth,
    changeOrigin: true,
    pathRewrite: {
      "^/v1/auth": "/api",
    },
    on: {
      proxyReq: (proxproxyReq, req: Request, res: Response) => {
        console.log(
          `Proxying request to Auth Service: ${req.method} ${req.path}`
        );
      },
      error: (err, req, res) => {
        console.log(
          `Error de redireccionmiento servicio caido : ${req.method} ${req.path}`
        );
      },
    },
  })
);

export default v1;
