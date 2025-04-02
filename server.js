import dotenv from "dotenv";
dotenv.config();
import methodOverride from "method-override";
import morgan from "morgan";
import session from "express-session";
import express from "express";
import authController from "./controllers/auth.js";
import "./db/connection.js";

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
import { isLoggedIn } from "./middleware/is-logged-in.js";
import { passUserToView } from "./middleware/pass-user-to-view.js";

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView);

app.use("/auth", authController);
app.use(isLoggedIn);
// routes for events

app.get("/events", (req, res) => {
    res.render("events.ejs", {
      user: req.session.user,
      events: []
    });
  });
  
app.get("/new", (req, res) => {
    res.render("new.ejs", {
user: req.session.user, 
    });
});

app.get('/:eventId', (req, res) => {
    const index = req.params.eventId;
    res.render('show.ejs', {
      event: events[index]
    });
  });

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
