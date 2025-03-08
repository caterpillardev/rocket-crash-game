import mongoose, { Schema, SchemaTypes } from "mongoose";
import { ICoinflip } from "types";

const mineSchema = new Schema<ICoinflip>({
  crashPoint: Number,
  player: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  startedAt: {
    type: Date,
    default: Date.now(),
  },
  state: {
    type: Number,
    required: true,
    default: 1,
  },
  betAmount: Number,
});

const Coinflip = mongoose.model<ICoinflip>("Coinflip", mineSchema);
export default Coinflip;
