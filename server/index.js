import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SupportAgentRoutes from "./routes/SupportAgentRoutes.js";
import SupportTicketRoutes from "./routes/SupportTicketRoutes.js";
import mongoose from "./utils/Database.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json("Server is running");
});

app.use("/api/support-agents", SupportAgentRoutes);
app.use("/api/support-tickets", SupportTicketRoutes);

app.use(errorHandler);

const server = app.listen(5000, () => {
	console.log("server running at port 5000");
});
