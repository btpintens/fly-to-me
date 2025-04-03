import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const router = express.Router();

// Render Sign Up Page
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

// Render Log In Page
router.get("/log-in", (req, res) => {
  res.render("auth/log-in.ejs");
});

// Handle User Sign Out
router.get("/sign-out", (req, res) => {
  req.session.destroy();  // Destroy the session on sign-out
  res.redirect("/");  // Redirect to the homepage or login page
});

// Handle User Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    // Check if the username is already taken
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }

    // Check if the password and confirm password match
    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }

    // Hash the password before saving to the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    // Create the new user in the database
    await User.create(req.body);

    // Redirect to the home or login page after successful sign up
    res.redirect("/auth/log-in");  // Redirect to login page after sign up
  } catch (error) {
    console.log(error);
    res.redirect("/auth/sign-up");  // Redirect back to the sign-up page in case of error
  }
});

// Handle User Log In
router.post("/log-in", async (req, res) => {
  try {
    // First, find the user in the database
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }

    // Check if the entered password is valid using bcrypt
    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }

    // If login is successful, create a session (without storing password in the session)
    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    // Debugging: Log the session user data
    console.log("User logged in:", req.session.user);

    // Redirect to /events after successful login
    res.redirect("/event");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/log-in");  // In case of error, redirect back to the login page
  }
});

export default router;
