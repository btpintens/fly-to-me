import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import Event from "../models/eventModel.js";  // relative path to models/eventModel.js

const router = express.Router();

// Route to fetch and display all events
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

// Route to render the create event page
router.get("/create", (req, res) => {
  res.render("create.ejs");  // Render the form to create an event
});

// POST request to create a new event
router.post("/create", async (req, res) => {
  console.log(req.body);  // Log the request body for debugging
  
  try {
    // Destructure the required fields from the request body
    const { name, startDate, endDate, guest } = req.body;

    // Check if the required fields are present
    if (!name || !startDate || !endDate) {
      return res.send("Name, startDate, and endDate are required fields!");
    }

    // Create a new event with the provided data
    const event = await Event.create({
      name,
      startDate,
      endDate,
      guests: guest ? guest.split(",") : [],  // Split guests by commas if present
    });

    // Redirect to events page after successful event creation
    res.redirect("/events");
  } catch (error) {
    console.error(error);  // Log the error for debugging
    res.redirect("/create");  // Redirect back to the form if there's an error
  }
});

// Route for displaying a specific event
router.get("/event/:id", async (req, res) => {
    const { id } = req.params; 
    try {
        const event = await Event.findById(id);  // Corrected method to findById
        if (!event) {
            return res.status(404).send("Event not found");  // Handle case where event is not found
        }
        res.render("event/show", { event });  // Render the event details page
    } catch (error) {
        console.error("Error fetching event:", error);
        res.redirect("/events");  // Redirect to events page on error
    }
});

// Route for editing an event
router.get("/event/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);  // Corrected method to findById
        if (!event) {
            return res.status(404).send("Event not found");  // Handle case where event is not found
        }
        res.render("event/edit", { event });  // Render the edit event page
    } catch (error) {
        console.error("Error fetching event for editing:", error);
        res.redirect("/events");  // Redirect to events page on error
    }
});

// Route for updating an event
router.put("/event/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        guests: req.body.guests,
    };

    try {
        const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
            new: true,  // Return the updated document
        });
        res.redirect(`/events/${id}`);  // Redirect to the updated event's page
    } catch (error) {
        console.error("Error updating event:", error);
        res.redirect("/events");
    }
});

// Route for deleting an event
router.delete("/event/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await Event.findByIdAndDelete(id);  // Corrected method to findByIdAndDelete
        res.redirect("/events");  // Redirect to events page after deletion
    } catch (error) {
        console.error("Error deleting event:", error);
        res.redirect("/events");
    }
});

export default router;
