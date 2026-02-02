import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceType: {
      type: String,
      enum: ["electricity", "water", "gas"]
    },
    amount: Number,
    dueDate: Date,
    status: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
