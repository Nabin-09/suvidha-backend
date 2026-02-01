import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import {
  initiatePayment,
  verifyPayment
} from "./payment.controller.js";
import { downloadReceipt } from "./receipt.controller.js";

const router = express.Router();

// 🔐 Protected routes (recommended)
router.post("/initiate", authenticate, initiatePayment);
router.post("/verify", authenticate, verifyPayment);

// 📄 Receipt download
router.get("/receipt/:paymentId", authenticate, downloadReceipt);

export default router;
