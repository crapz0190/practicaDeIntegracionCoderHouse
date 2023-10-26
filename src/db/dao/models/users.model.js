import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const usersModel = mongoose.model("Messages", messagesSchema);
