import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import complaintRoutes from "../modules/complaint/complaint.routes.js";
import billRoutes from "../modules/bill/bill.routes.js";
import paymentRoutes from "../modules/payment/payment.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);
router.use("/bills", billRoutes);
router.use("/payments", paymentRoutes);

export default router;
