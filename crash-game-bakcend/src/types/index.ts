import { Request } from "express";
import { Document, ObjectId } from "mongoose";

export interface JwtPayload {
  userId: string;
}

export interface IUser extends Document {
  crypto: string;
  wallet: number;
  avatar: string;
  totalDeposited: number;
  totalWithdraw: number;

  password?: string;
  username: string;
  email?: string;
  nickname?: string;

  crash: number;
  coinflip: number;
  mine: number;
}

export interface IChat extends Document {
  message: string;
  user: ObjectId;
  sentAt: Date;
}

export interface ITransaction extends Document {
  user: ObjectId;
  tranType: number;
  walletAddress: string;
  txid: string;
  amount: number;
  created: Date;
  game: number;
}

export interface ICrash extends Document {
  crashPoint: number;
  players: Object;
  refundedPlayers: ObjectId[];

  privateSeed: string;
  privateHead: string;
  publicSeed: string;

  status: number;
  startedAt: Date;
  userCounts: number;
}

export interface IMine extends Document {
  player: ObjectId;
  startedAt: Date;
  crashPoint: number;
  state: number;
}

export interface ICoinflip extends Document {
  player: ObjectId;
  startedAt: Date;
  crashPoint: number;
  state: number;
  betAmount: number;
}

export interface ISiteTransaction extends Document {
  bet: number;
  type: number;
  time: Date;
  multi: number;
  payout: number;
  reason: string;
  game: string;
  extraData: {
    coinflipGameId?: ObjectId;
    crashGameId?: ObjectId;
    mineGameId?: ObjectId;
    transactionId?: ObjectId;
  };
  userId: ObjectId;
}

export interface IGameStateType {
  _id: ObjectId | null;
  status: number;
  crashPoint: number | null;
  startedAt: Date | null;
  duration: number | null;
  players: { [key: string]: IBetType };
  bots: { [key: string]: IBetType };
  pending: { [key: string]: IPendingBetType };
  botCount: number;
  pendingCount: number;
  pendingBets: IPendingBetType[];
  privateSeed: string | null;
  privateHash: string | null;
  publicSeed: string | null;
  connectedUsers: { [key: string]: string };
}

export interface IBetType {
  playerID: string;
  username: string;
  avatar: string;
  betAmount: number;
  status: number;
  stoppedAt?: number;
  autoCashOut: number;
  winningAmount?: number;
  forcedCashout?: boolean;
  autobet?: boolean;
  crypto: string;
}

export interface IPendingBetType {
  playerID: string;
  betAmount: number;
  autoCashOut?: number;
  username: string;
  crypto: string;
  avatar: string;
  winningAmount?: number;
  status?: number;
  stoppedAt?: number;
}

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export type TFormattedPlayerBetType = Pick<
  IBetType,
  | "playerID"
  | "username"
  | "avatar"
  | "betAmount"
  | "status"
  | "stoppedAt"
  | "winningAmount"
  | "autobet"
  | "crypto"
>;
