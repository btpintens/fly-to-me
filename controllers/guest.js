import express from "express";
import Guest from "../models/guestmodel.js";
import Event from "../models/eventModel.js"; 

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, etaHour, etaMinutes, transportMethod, rsvp, eventId } = req.body;
        console.log("Event ID: ", eventId)

        const newGuest = await Guest.create({
            name,
            etaHour, 
            etaMinutes, 
            transportMethod,
            rsvp: rsvp === "true" || rsvp === "on"
        })

        console.log("New Guest: ", newGuest)

        const event = await Event.findById(eventId)
        console.log("Found Event: ", event)
        if (!event) {
            return res.status(404).send("Event not found")
        }

        event.guests.push(newGuest._id);
        await event.save();

        res.redirect(`events/${eventId}`)   
    } catch(err){
        console.error(err)
        res.status(500).send("Failed to create a guest")
    }
})

export default router