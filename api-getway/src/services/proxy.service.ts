import { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ServiceType } from "../enum/services.enum";
import { Socket } from "net";
import config from "../config/config";

interface ProxyOptions {
  serviceType: ServiceType;
}
const handleProxyRequest = (proxyReq: any, req: Request, res: Response) => {
  if (req.body && Object.keys(req.body).length > 0) {
    const bodyData = JSON.stringify(req.body);
    proxyReq.setHeader("Content-Type", "application/json");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    proxyReq.write(bodyData);
  }
};

const handleError = (err: Error, req: Request, res: any) => {
  if (!(res instanceof Socket)) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createProxyOptions = ({ serviceType }: ProxyOptions) => ({
  target: config.services[serviceType].url,
  changeOrigin: true,
  pathRewrite: (path: string) =>
    path.replace("/", config.services[serviceType].redirect),
  proxyTimeout: config.services[serviceType].timeout,
  timeout: config.services[serviceType].timeout,
  on: {
    proxyReq: handleProxyRequest,
    error: handleError,
  },
});

export const createServiceProxy = (options: ProxyOptions) => {
  return createProxyMiddleware(createProxyOptions(options));
};
