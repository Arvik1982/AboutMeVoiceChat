import { Router } from "express";
import { sendMessage } from "../controllers/chatController.js";
import { chatLimiter } from "../middlewares/rateLimiter.js";

const router = Router();

router.post("/chat", chatLimiter, sendMessage);

export default router;
