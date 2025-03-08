import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "app";
import { setupChatServer } from "services/chat";
import { setupCrashServer } from "services/crash";
import { setupCoinflipServer } from "services/coinflip";
import { setupMineServer } from "services/mine";

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupChatServer(io);
setupCrashServer(io);
setupCoinflipServer(io);
setupMineServer(io);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
