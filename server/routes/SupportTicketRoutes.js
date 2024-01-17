import { Router } from "express";
import {
	createSupportTicket,
	getSupportTickets,
} from "../controllers/SupportTicketController.js";

const router = Router();

router.post("/", createSupportTicket);
router.get("/", getSupportTickets);

export default router;
