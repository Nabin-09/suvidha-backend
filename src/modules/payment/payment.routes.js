import express from "express";
import authenticate from "../../middlewares/authenticate.js";
import {
  initiatePayment,
  verifyPayment
} from "./payment.controller.js";
import { downloadReceipt } from "./receipt.controller.js";

const router = express.Router();


router.post("/initiate", authenticate, initiatePayment);
router.post("/verify", authenticate, verifyPayment);
  
router.get("/receipt/:paymentId", authenticate, downloadReceipt);

export default router;
