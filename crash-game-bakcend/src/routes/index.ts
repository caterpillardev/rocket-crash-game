import { Router } from "express";
import authRoutes from "./auth";
import userRoutes from "./user";
import transactionRoutes from "./transaction";
import aiuserRoutes from "./aiuser";

const router = Router();
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/aiuser", aiuserRoutes);
router.use("/transaction", transactionRoutes);

export default router;
