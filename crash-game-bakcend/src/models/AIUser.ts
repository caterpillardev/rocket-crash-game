import mongoose, { Schema } from "mongoose";
import { IUser } from "types";

const aiuserSchema = new Schema<IUser>({
  crypto: { type: String, required: true, unique: true },
  wallet: { type: Number, required: true, default: 0 },
  avatar: { type: String, required: true },
  totalDeposited: { type: Number, required: true, default: 0 },
  totalWithdraw: { type: Number, require: true, default: 0 },

  username: { type: String, default: "" },
  // email: { type: String, sparse: true },
  nickname: String,

  crash: { type: Number, default: 0 },
  mine: { type: Number, default: 0 },
  coinflip: { type: Number, default: 0 },
});

const AIUser = mongoose.model<IUser>("AIUser", aiuserSchema);
export default AIUser;
