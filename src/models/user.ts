import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  discord_id: { type: String, required: true, ref: "messages" },
  username: { type: String, required: true },
  discriminator: { type: String, required: true },
  wallet_address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

export default User;
