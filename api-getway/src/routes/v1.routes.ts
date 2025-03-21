import { Router } from "express";
import { createServiceProxy } from "../services/proxy.service";
import { ServiceType } from "../enum/services.enum";

const v1: Router = Router();

v1.use(
  "/auth",
  createServiceProxy({
    serviceType: ServiceType.AUTH,
  })
);

export default v1;
