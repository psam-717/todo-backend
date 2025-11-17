import { Router } from "express";
import { healthMessage } from "../controllers/health.controller";

const router = Router();

router.get('/health', healthMessage)

export default router;