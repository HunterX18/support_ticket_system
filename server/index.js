import express from "express";
import cors from "cors";
import SupportAgentRoutes from "./routes/SupportAgentRoutes.js";
import SupportTicketRoutes from "./routes/SupportTicketRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/support-agents", SupportAgentRoutes);
app.use("/api/support-tickets", SupportTicketRoutes);

const server = app.listen(5000, () => {
	console.log("server running at port 5000");
});

