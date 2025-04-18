import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events"}],
});

// Model names should be capitalized
const User = mongoose.model("users", userSchema)

export default User