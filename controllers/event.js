import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";  // relative path to models/eventModel.js

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        console.log("Fetched events:", events);  // Log the fetched events
        res.render("events", { events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.redirect("/auth/log-in");
    }
});


// Route for displaying the "Create Event" page
router.get("/create", (req, res) => {
    res.render("/create.ejs");  // This should render your new event form (create.ejs)
});

// Route for submitting the form and creating the event
router.post("/create", async (req, res) => {
        const { name, startDate, endDate, guests } = req.body;
    try {
        // Create a new event and save it to the database
        const event = await Event.create({ name, startDate, endDate, guests });

        // Redirect to the events page after successful creation
        res.redirect("/events.");
    } catch (error) {
        console.error("Error creating event:", error);
        res.redirect("/auth/log-in");  // In case of error, redirect to login
    }
});


export default router 