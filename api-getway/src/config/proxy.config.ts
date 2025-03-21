interface ServiceConfig {
  target: string;
  pathPrefix: string;
  timeout: number;
  routes: string[];
}

interface ProxyConfig {
  [key: string]: ServiceConfig;
}

export const proxyConfig: ProxyConfig = {
  auth: {
    target: "http://localhost:3002",
    pathPrefix: "/v1/api",
    timeout: 15000,
    routes: ["/login", "/register", "/logout"],
  },
  // Add more services as needed
};
