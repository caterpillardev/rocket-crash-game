import { io } from "socket.io-client";

const SOCKET_URL = process.env.BACK_URL || "http://localhost:4000";

export const mineSocket = io(`${SOCKET_URL}/mines`);
