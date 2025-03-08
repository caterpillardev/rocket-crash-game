import mongoose, { Schema, SchemaTypes } from "mongoose";
import { IChat } from "types";

const chatSchema = new Schema<IChat>({
  message: String,
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model<IChat>("Chat", chatSchema);
export default Chat;
