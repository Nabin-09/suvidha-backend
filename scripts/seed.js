import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/modules/user/user.model.js";
import Bill from "../src/modules/bill/bill.model.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const admin = await User.create({
  phone: "9999999999",
  role: "admin"
});

await Bill.create({
  userId: admin._id,
  serviceType: "water",
  amount: 300,
  dueDate: new Date()
});

console.log("✅ Admin & bill seeded");
process.exit();
