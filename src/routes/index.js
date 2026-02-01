import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import complaintRoutes from "../modules/complaint/complaint.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);

export default router;
