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
  guests: [{type: mongoose.Schema.Types.ObjectId, ref: "Guest"}],
});

const Event = mongoose.model("Event", eventSchema);

export default Event; 