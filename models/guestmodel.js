import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
    name: {type: String, required: true},
    etaHour: {type: Number, min: 0, max: 23},
    etaMinutes: {type: Number, min: 0, max: 59},
    etaSuffix: { type: String, enum: ["a.m.", "p.m."] },
    transportMethod: {type: String, enums: ["car", "train", "bus", "plane", "boat"]},
    rsvp: {type: Boolean, default: false}
});

// Model names should be capitalized
const Guest = mongoose.model("guests", guestSchema)

export default Guest