import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import session from "express-session";
import express from "express";
import authController from "./controllers/auth.js";
import methodOverride from "method-override";
import "./db/connection.js";
import eventController from "./controllers/event.js";
import guestController from "./controllers/guest.js"
import { isLoggedIn } from "./middleware/is-logged-in.js";
import { passUserToView } from "./middleware/pass-user-to-view.js";
import expressLayouts from "express-ejs-layouts";

const app = express();
const port = process.env.PORT || 3000;  // Default to 3000 if no port is specified

// Middleware
app.use(express.urlencoded({ extended: true }));  // This middleware handles form data correctly
app.use(methodOverride("_method")); // This middleware allows us to make PUT and DELETE requests from our form
app.use(express.json());  // This allows JSON data to be sent with POST requests
app.use(morgan("dev"));  // Logging requests to the console
app.set("view engine", "ejs");  // Setting EJS as the template engine

//serve static files 
app.use(express.static("public"));
app.use(expressLayouts);
app.set('layout', 'layout');

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },  // Set to `true` for HTTPS connections
  })
);

// Middleware to pass the logged-in user data to views
app.use(passUserToView);

// Routes
app.use("/auth", authController);  // Authentication routes (sign-in, sign-up, sign-out)
app.use(isLoggedIn);  // Ensure the user is logged in for all routes below

app.use("/events", eventController);  // Event-related routes
app.use("/guests", guestController);  // Guest-related routes

// Start the server
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});

