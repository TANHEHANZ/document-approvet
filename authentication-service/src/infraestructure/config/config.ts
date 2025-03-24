const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  client_url: process.env.CLIENT_URL || "conexion socket",
};

export default config;
