const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  JWT_SECRET:
    process.env.JWT_SECRET ||
    "asdsakjda5aa5a4sd4as54d5asc5c4c54s8e87f8s2c121v54dssf5da54sd8a7d8c2v1x2vb1fg7h87g",
};

export default config;
