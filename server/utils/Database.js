import mongoose from "mongoose";
import dotenv from "dotenv";
import DatabaseError from "./errors/database-connection-error.js";

dotenv.config();

try {
   await mongoose.connect(process.env.MONGODB_URI)
   console.log("connected to database");
} catch(error) {
    throw new DatabaseError("Unable to connect to database");
}

export default mongoose;
