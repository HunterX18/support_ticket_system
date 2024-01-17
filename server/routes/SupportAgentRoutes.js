import { Router } from "express";
import { createSupportAgent } from "../controllers/SupportAgentController.js";

const router = Router();

router.post("/", createSupportAgent);

export default router;
