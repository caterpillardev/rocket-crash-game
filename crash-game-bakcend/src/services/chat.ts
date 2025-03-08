import Chat from "models/Chat";
import User from "models/User";
import { Server } from "socket.io";
import { IUser } from "types";
import jwt, { TokenExpiredError } from "jsonwebtoken";

export const setupChatServer = (io: Server) => {
  const chatNamespace = io.of("/chat");

  let user: IUser | null = null;
  let logged: boolean = false;

  chatNamespace.on("connection", (socket) => {
    console.log("Chat user connected");

    socket.emit("online-users", chatNamespace.sockets.size);

    // Here is Game chart part you can add

    socket.on("disconnect", () => {
      console.log("Chat user disconnected");
    });
  });
};
