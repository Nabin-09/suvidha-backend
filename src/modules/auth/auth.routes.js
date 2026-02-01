import express from "express";
import { sendOTP, verifyOtpAndLogin, logout } from "./auth.controller.js";
import { authLimiter } from "../../middlewares/rateLimit.js";

const router = express.Router();

router.post("/send-otp", authLimiter , sendOTP);
router.post("/verify-otp", verifyOtpAndLogin);
router.post("/logout", logout);

export default router;
