import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI)
	.then((result) => console.log("connected to db"))
	.catch((err) => console.log(err));

export default mongoose;
