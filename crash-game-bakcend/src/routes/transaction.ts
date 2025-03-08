import { getHistory, getSiteHistory } from "controllers";
import { Router } from "express";

const router = Router();
router.post("/history", getHistory);
router.get("/sitehistory", getSiteHistory);

export default router;
