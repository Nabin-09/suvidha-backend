import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/modules/user/user.model.js";
import Bill from "../src/modules/bill/bill.model.js";

dotenv.config();

const TOTAL_CITIZENS = 10;

const SERVICES = ["water", "electricity", "gas"];

const randomAmount = (service) => {
  if (service === "water") return Math.floor(200 + Math.random() * 200);
  if (service === "electricity") return Math.floor(400 + Math.random() * 400);
  if (service === "gas") return Math.floor(300 + Math.random() * 300);
};

const randomFutureDate = () => {
  const days = Math.floor(Math.random() * 30) + 5;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};


const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

 
    const admin = await User.findOneAndUpdate(
      { phone: "9999999999" },
      { role: "admin" },
      { upsert: true, new: true }
    );
    console.log("👑 Admin ready:", admin.phone);


    for (let i = 1; i <= TOTAL_CITIZENS; i++) {
      const phone = `90000000${i.toString().padStart(2, "0")}`;

      const user = await User.findOneAndUpdate(
        { phone },
        { role: "citizen" },
        { upsert: true, new: true }
      );

      console.log(`👤 User ready: ${phone}`);


      for (const service of SERVICES) {
        const exists = await Bill.findOne({
          userId: user._id,
          serviceType: service
        });

        if (!exists) {
          await Bill.create({
            userId: user._id,
            serviceType: service,
            amount: randomAmount(service),
            dueDate: randomFutureDate(),
            status: "unpaid"
          });

          console.log(`   💡 Bill created → ${service}`);
        }
      }
    }

    console.log("🎉 DATABASE SEEDING COMPLETE");
    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED:", err);
    process.exit(1);
  }
};

runSeed();
