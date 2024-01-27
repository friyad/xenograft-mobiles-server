import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  refreshToken: String,
});

export const UserModel = mongoose.model("users", userSchema);
