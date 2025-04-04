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

const Event = mongoose.model("events", eventSchema);

export default Event; 