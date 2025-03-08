import mongoose, { Schema, SchemaTypes } from "mongoose";
import { ISiteTransaction } from "types";

const siteTransactionSchema = new Schema<ISiteTransaction>({
  bet: Number,
  reason: String,
  type: Number,
  time: { type: SchemaTypes.Date, default: new Date() },
  multi: Number,
  payout: Number,
  game: String,

  extraData: {
    coinflipGameId: {
      type: SchemaTypes.ObjectId,
      ref: "Coinflip",
    },
    crashGameId: {
      type: SchemaTypes.ObjectId,
      ref: "Crash",
    },
    mineGameId: {
      type: SchemaTypes.ObjectId,
      ref: "Mine",
    },
    transactionId: {
      type: SchemaTypes.ObjectId,
      ref: "Transaction",
    },
  },

  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
});

const SiteTransaction = mongoose.model<ISiteTransaction>(
  "SiteTransaction",
  siteTransactionSchema
);
export default SiteTransaction;
