import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI);

Mongoose.connection.on("connected", ()=> {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    
});