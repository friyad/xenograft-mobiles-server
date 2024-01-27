import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export const UserModel = mongoose.model("users", userSchema);
