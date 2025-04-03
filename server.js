import dotenv from "dotenv";
dotenv.config();
import methodOverride from "method-override";
import morgan from "morgan";
import session from "express-session";
import express from "express";
import authController from "./controllers/auth.js";
import "./db/connection.js";
import createController from "./controllers/create.js";
import eventController from "./controllers/event.js";

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
import { isLoggedIn } from "./middleware/is-logged-in.js";
import { passUserToView } from "./middleware/pass-user-to-view.js";

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passUserToView);

app.use("/auth", authController);
app.use(isLoggedIn);

app.use("/create", createController);
app.use("/events", eventController);


app.get("/events", isLoggedIn, (req, res) => {
    res.render("events", { user: req.session.user });
});


app.get("/create", isLoggedIn, (req,res) => {
        res.render("create", {user: req.session.user});   
});
app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
