import express from "express";
import Guest from "../models/guestmodel.js";
import Event from "../models/eventModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, etaHour, etaMinutes, transportMethod, rsvp, eventId } =
      req.body;

    const newGuest = await Guest.create({
      name,
      etaHour,
      etaMinutes,
      transportMethod,
      rsvp: rsvp === "true" || rsvp === "on",
    });

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send("Event not found");
    }

    event.guests.push(newGuest._id);
    await event.save();

    res.redirect(`events/${eventId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create a guest");
  }
});

router.delete("/:guestId/events/:eventId", async (req, res) => {
  try {
    console.log("Im in delete guest requst");
    const { guestId, eventId } = req.params;
    await Guest.findByIdAndDelete(guestId);

    await Event.findByIdAndUpdate(eventId, {
      $pull: { guests: guestId },
    });

    res.redirect(`/events/${eventId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting guest");
  }
});

router.get("/:guestId/events/:eventId", async (req, res) => {
  const guest = await Guest.findById(req.params.guestId);
  res.render("getGuest", { guest, eventId: req.params.eventId });
});

router.put("/:guestId/edit", async (req, res) => {
  const { guestId } = req.params;
  const { name, etaHour, etaMinutes, transportMethod, rsvp, eventId } =
    req.body;

  try {
    await Guest.findByIdAndUpdate(
      guestId,
      {
        name,
        etaHour,
        etaMinutes,
        transportMethod,
        rsvp: rsvp === "true" || rsvp === "on",
      },
      { new: true }
    );

    res.redirect(`/events/${eventId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating guest");
  }
});

export default router;
