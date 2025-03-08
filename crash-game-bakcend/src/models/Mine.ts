import mongoose, { Schema, SchemaTypes } from "mongoose";
import { IMine } from "types";

const mineSchema = new Schema<IMine>({
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
});

const Mine = mongoose.model<IMine>("Mine", mineSchema);
export default Mine;
