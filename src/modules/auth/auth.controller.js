import jwt from "jsonwebtoken";
import User from "../user/user.model.js";
import { generateOTP, verifyOTP } from "./otp.service.js";

export const sendOTP = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone required" });

  generateOTP(phone);
  res.json({ success: true, message: "OTP sent" });
};

export const verifyOtpAndLogin = async (req, res) => {
  const { phone, otp } = req.body;

  if (!verifyOTP(phone, otp)) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });

  const token = jwt.sign(
    { userId: user._id, role: user.role, phone: user.phone },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax"
  });

  res.json({ success: true, user });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
};
