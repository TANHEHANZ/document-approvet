const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.APP_DEBUG === "true",
  logLevel: process.env.LOG_LEVEL || "info",
  issuerBaseUrl: process.env.ISSUER_BASE_URL || "",
  audience: process.env.AUDIENCE || "",
  services: {
    auth: process.env.AUTH_SERVICE_URL || "http://localhost:3002",
    approvent: process.env.APPROVENT_SERVICE_URL || "http://localhost:3003",
  },
};

export default config;
