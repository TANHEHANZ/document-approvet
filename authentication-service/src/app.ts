import { createServer } from "./server";

const port = 3001;
const server = createServer();

server.listen(port, () => {
  console.log(`Authentication Service running on port ${port}`);
});
