import { Router } from "express";
import {
	createSupportTicket,
	getSupportTickets,
	editSupportTicket
} from "../controllers/SupportTicketController.js";

const router = Router();

router.post("/", createSupportTicket);
router.get("/", getSupportTickets);
router.put("/", editSupportTicket);

export default router;
