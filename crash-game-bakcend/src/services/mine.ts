import User from "models/User";
import { Server } from "socket.io";
import { IUser } from "types";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import SiteTransaction from "models/SiteTransaction";
import Mine from "models/Mine";
import Transaction from "models/Transaction";

interface IGameState {
  _id: string;
  status: number;
  startedAt: Date;
  crashPoint: number;
  betAmount: number;
  map: number[];
  mines: number;
}

const GAME_STATES = {
  NotStarted: 1,
  Starting: 2,
  InProgress: 3,
  Over: 4,
  Blocking: 5,
  Refunded: 6,
};

const frequencyQuery = [
  3, 1, 2, 1, 3, 1, 1, 2.5, 1, 1, 2, 2.5, 3, 2.5, 2, 1, 1, 2.5, 1, 1, 3, 1, 2,
  1, 2,
];

const GAME_STATE: IGameState = {
  _id: "",
  status: GAME_STATES.Starting,
  startedAt: new Date(),
  crashPoint: 0,
  betAmount: 0,
  map: [],
  mines: 0,
};

let side = 0;

const createRandomMatrix = (n: number) => {
  // Create an array of indices representing positions in the freqArray
  const indices = Array.from({ length: 25 }, (_, i) => i);

  const weights = [...frequencyQuery];

  const finalArray = Array(25).fill(1);

  function weightedRandom(weights: number[]) {
    let sum = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * sum;

    for (let i = 0; i < weights.length; i++) {
      if (random < weights[i]) return i;
      random -= weights[i];
    }

    return weights.length - 1;
  }

  for (let i = 0; i < n; i++) {
    const idx = weightedRandom(weights);
    finalArray[indices[idx]] = 0;
    weights.splice(idx, 1);
    indices.splice(idx, 1);
  }

  return finalArray;
};

export const setupMineServer = (io: Server) => {
  const mineNamespace = io.of("/mines");
  let user: IUser | null = null;
  let logged: boolean = false;

 //Mine game 
};
