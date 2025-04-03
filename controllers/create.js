import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";


const router = express.Router();

router.get("/create", async (req, res) => {
  try {
    let { name, startDate, endDate, guest } = req.body;
    const event = await Event.create({ name, startDate, endDate, guest });
  
    res.redirect('/create');
  } catch (error) {
    console.error(error);
    res.redirect('/auth/log-in');
  }
    //res.render("/create.ejs");
  });

  router.post("/create", async (req, res) => {
    //request the body from the event 
    let { name, startDate, endDate, guest } = req.body;

// uset .creat to save a new model instance in your DB
    const event = await Event.create({ name, startDate, endDate, guest });
    res.redirect("/events");
  });

  export default router;
