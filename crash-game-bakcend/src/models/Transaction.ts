import mongoose, { Schema, SchemaTypes } from "mongoose";
import { ITransaction } from "types";

const transactionSchema = new Schema<ITransaction>({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  tranType: {
    type: Number,
  },
  walletAddress: {
    type: String,
    required: true,
  },
  txid: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  game: Number,
  created: {
    type: Date,
    default: Date.now(),
  },
});

const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema
);
export default Transaction;
