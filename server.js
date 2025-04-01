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
//const isSignedIn = require('./middleware/is-signed-in.js');
//const passUserToView = require('./middleware/pass-user-to-view.js');

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passUserToView); 

app.get('/', (req, res) => {
    res.render('index.ejs', {
      user: req.session.user,
    });
  });
  
  app.use('/auth', authController);
  app.use(isLoggedIn);
  
  app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
  