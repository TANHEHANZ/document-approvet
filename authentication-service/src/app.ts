import dotenv from "dotenv";
dotenv.config();
import { createServer } from "./server";
import config from "./commands/config/config";

const server = createServer();

server.listen(config.port, () => {
  console.log(`API-GETWAY Run in :  ${config.port}`);
});
