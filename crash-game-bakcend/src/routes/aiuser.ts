import { generateFakers } from "controllers";
import { Router } from "express";

const router = Router();
router.post("/generate", generateFakers);

export default router;
