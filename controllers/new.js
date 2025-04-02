import express from "express";
import bcrypt from "bcrypt";
import User from "../models/usersmodel.js";
import events from "../models/eventmodel.js"

const router = express.Router();

router.get("/new", (req, res) => {
    res.render("/new.ejs");
  });

  router.post("/new", async (req, res) => {
    //request the body from the event 
    let { name, startDate, endDate, guest } = req.body

// uset .creat to save a new model instance in your DB
    let event =
    res.redirect("/events");
  });

    // try {
    //   const newInDatabase = await events.findOne({ eventname: req.body.eventname });
    //   if (eventsInDatabase) {
    //     return res.send("Event already exists");
    //   }
    // await Event.create(req.body);

  //   res.redirect("/events");
  // } catch (error) {
  //   console.log(error);
  //   res.redirect("/");
  // }):
