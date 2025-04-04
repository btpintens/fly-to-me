import express from "express";
import Event from "../models/eventModel.js"; // relative path to models/eventModel.js

const router = express.Router();

// Route to fetch and display all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    console.log("Fetched events:", events); // Log the fetched events
    res.render("events", { events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.redirect("/auth/log-in");
  }
});

// Route to render the create event page
router.get("/create", (req, res) => {
  res.render("create.ejs"); // Render the form to create an event
});

// POST a new event
router.post("/create", async (req, res) => {
  console.log(req.body); // Log the request body for debugging

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
      guests: guest ? guest.split(",") : [], // Split guests by commas if present
    });

    // Redirect to events page after successful event creation
    res.redirect("/events");
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.redirect("/create"); // Redirect back to the form if there's an error
  }
});

// get a specific event
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("guests");

    if (!event) {
      return res.status(404).send("Event not found");
    }

    res.render("show", { event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Helper function that formats date string to yyyy-mm-dd format for default value in date input tag
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// edit specific event (get and put)
router.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).send("Event not found");
  }

  res.render("edit", { event, startDate: formatDate(event.startDate),  endDate: formatDate(event.endDate)});
});

router.put("/:id/edit", async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { name, startDate, endDate } = req.body;

    // Check if the required fields are present
    if (!name || !startDate || !endDate) {
      return res.send("Name, startDate, and endDate are required fields!");
    }
    // Create a new event with the provided data
    const event = await Event.findByIdAndUpdate(req.params.id, req.body)

    // Redirect to events page after successful event creation
    res.redirect(`/events/${event._id}`);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.redirect("/create"); // Redirect back to the form if there's an error
  }
})

// Route for deleting an event (get and delete)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Event.findByIdAndDelete(id); // Corrected method to findByIdAndDelete
    res.redirect("/events"); // Redirect to events page after deletion
  } catch (error) {
    console.error("Error deleting event:", error);
    res.redirect("/events");
  }
});

export default router;
