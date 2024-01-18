import { Router } from "express";
import {
	assignAgent,
	createSupportAgent,
	getSupportAgents,
} from "../controllers/SupportAgentController.js";

const router = Router();

router.post("/", createSupportAgent);
router.get("/", getSupportAgents);
router.get("/getAgent", assignAgent);

export default router;
