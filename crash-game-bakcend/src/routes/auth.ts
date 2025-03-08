import { signIn, test } from "controllers";
import { Router } from "express";

const router = Router();
router.post("/signin", signIn);
router.get("/", test);

export default router;
