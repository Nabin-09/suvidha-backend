import express from "express";
import { sendOTP, verifyOtpAndLogin, logout } from "./auth.controller.js";

const router = express.Router();

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOtpAndLogin);
router.post("/logout", logout);

export default router;
