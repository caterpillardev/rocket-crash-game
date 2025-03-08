import {
  approve,
  deposit,
  getCrashRank,
  getFlipRank,
  getMineRank,
} from "controllers";
import { Router } from "express";

const router = Router();
router.post("/deposit", deposit);
router.post("/approve", approve);
router.get("/getCrashRank", getCrashRank);
router.get("/getMineRank", getMineRank);
router.get("/getFlipRank", getFlipRank);

export default router;
