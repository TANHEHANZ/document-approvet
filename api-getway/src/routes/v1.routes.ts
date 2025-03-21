import express, { Request, Response, Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../config/config";
import { Socket } from "net";
const v1: Router = express.Router();
//  tengo que manejar un diccionario de datos
// tengo que manejar cache y registrar las rutas a usar en el servicio
//  con ello me permitira manejar de mejor forma la concurrencia de los datos
v1.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/v1/auth": "/v1/api/",
    },
    proxyTimeout: 15000,
    timeout: 15000,
    on: {
      proxyReq: (proxyReq, req: Request, res: Response) => {
        if (req.body && Object.keys(req.body).length > 0) {
          const bodyData = JSON.stringify(req.body);
          proxyReq.setHeader("Content-Type", "application/json");
          proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
          proxyReq.write(bodyData);
        }
        console.log(
          `Proxying request to Auth Service: ${req.method} ${req.path} ${
            req.body ? JSON.stringify(req.body) : ""
          }` + proxyReq.path
        );
      },
      error: (err, req, res) => {
        console.log("Proxy Error:", err);
        if (!(res instanceof Socket)) {
          res.status(500).json({ error: "Error interno del servidor" });
        }
      },
    },
  })
);

export default v1;
