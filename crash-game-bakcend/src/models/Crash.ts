import mongoose, { Schema } from "mongoose";
import { ICrash } from "types";

const crashSchema = new Schema<ICrash>(
  {
    crashPoint: { type: Number, required: true, default: 0 },
    players: Object,
    refundedPlayers: Array,

    privateSeed: String,
    privateHead: String,
    publicSeed: {
      type: String,
      default: null,
    },

    status: {
      type: Number,
      default: 1,
    },

    startedAt: {
      type: Date,
    },

    userCounts: {
      type: Number,
      default: 0,
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Crash = mongoose.model<ICrash>("Crash", crashSchema);
export default Crash;
