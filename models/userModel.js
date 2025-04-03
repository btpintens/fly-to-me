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
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event"}],
});

const User = mongoose.model("User", userSchema)

export default User