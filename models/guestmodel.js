import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    name: {type: String, required: true},
    etaHour: {type: Number, min: 0, max: 23},
    etaMinutes: {type: Number, min: 0, max: 59},
    transportMethod: {type: String, enums: ["car", "train", "bus", "plane", "boat"]},
    rsvp: {type: Boolean, default: false}
});

const Guest = mongoose.model("Guest", guestSchema)

export default Guest