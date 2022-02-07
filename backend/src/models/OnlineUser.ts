import mongoose from "mongoose";

const OnlineUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    socketId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("online", OnlineUserSchema);
