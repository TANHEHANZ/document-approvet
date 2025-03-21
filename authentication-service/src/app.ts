import { createServer } from "./server";

const port = 3003;
const server = createServer();

server.listen(port, () => {
  console.log(`Authentication Service running on port ${port}`);
});
