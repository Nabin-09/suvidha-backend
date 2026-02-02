import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/modules/user/user.model.js";
import Bill from "../src/modules/bill/bill.model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

// ✅ UPSERT admin user
const admin = await User.findOneAndUpdate(
  { phone: "9999999999" },
  { role: "admin" },
  { new: true, upsert: true }
);

// ✅ Seed bill only if none exists
const billExists = await Bill.findOne({ userId: admin._id });

if (!billExists) {
  await Bill.create({
    userId: admin._id,
    serviceType: "water",
    amount: 300,
    dueDate: new Date()
  });
}

console.log("✅ Seed complete (safe to run multiple times)");
process.exit();
