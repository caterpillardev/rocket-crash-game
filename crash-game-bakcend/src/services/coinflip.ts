import { Server } from "socket.io";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import User from "models/User";
import { IUser } from "types";
import SiteTransaction from "models/SiteTransaction";
import Coinflip from "models/Coinflip";
import {
  generateCoinflipRandom,
  generatePrivateSeedHashPair,
} from "utils/random";
import Transaction from "models/Transaction";

const GAME_STATES = {
  Starting: 1,
  InProgress: 2,
  Over: 3,
};

interface IGameState {
  _id: string;
  status: number;
  startedAt: Date;
  crashPoint: number;
  betAmount: number;
}

const GAME_STATE: IGameState = {
  _id: "",
  status: GAME_STATES.Starting,
  crashPoint: 0,
  startedAt: new Date(),
  betAmount: 0,
};

const getWinningSide = async (
  randomModule: number,
  heads: number,
  count: number
) => {
  return new Promise((resolve) => {
    resolve(randomModule >= (100 * heads) / count ? true : false);
  });
};

export const setupCoinflipServer = (io: Server) => {
  const coinflipNamespace = io.of("/coinflip");

  let user: IUser | null = null;
  let logged: boolean = false;

  coinflipNamespace.on("connection", (socket) => {
    console.log("Coinflip user connected");

    socket.on("auth", async (data) => {
      try {
       // coin flip game server
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          return socket.emit(
            "expire-error",
            "Token has expired. Please log in again."
          );
        }
        return socket.emit("error", "Authentication failed.");
      }
    });

    socket.on(
      "create-new-game",
      // coin file game and transaction create
    );
  });
};
