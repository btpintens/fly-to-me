import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    startDate : {
        type: dateString,
    },
    endDate : {
        type: dateString,
    }
    guests : {
        type: [strings],
    }
});

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    events: [eventSchema], 
  });