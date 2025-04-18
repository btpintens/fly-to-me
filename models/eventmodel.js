import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "guests" }],
});

// Model names should be capitalized
const Event = mongoose.model("events", eventSchema);

export default Event; 