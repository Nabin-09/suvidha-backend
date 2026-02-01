import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    billId: { type: mongoose.Schema.Types.ObjectId, ref: "Bill" },
    amount: Number,
    status: {
      type: String,
      enum: ["created", "success", "failed"],
      default: "created"
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    receiptUrl: String
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
