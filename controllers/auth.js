import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

const router = express.Router();

//Render landing page
router.get("/", (req, res) => {
  res.render("auth/index");
});
// Render Sign Up Page
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up.ejs");
});

// Render Log In Page
router.get("/log-in", (req, res) => {
  res.render("auth/log-in.ejs");
});

// Handle User Sign Out (POST only)
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth");
});

// Handle User Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send("Username already taken.");
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send("Password and Confirm Password must match");
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    await User.create(req.body);
    res.redirect("/auth/log-in");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/sign-up");
  }
});

// Handle User Log In
router.post("/log-in", async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send("Login failed. Please try again.");
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id,
    };

    console.log("User logged in:", req.session.user);
    res.redirect("/events");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/log-in");
  }
});

export default router;
