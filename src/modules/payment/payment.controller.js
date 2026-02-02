import crypto from "crypto";
import razorpay from "./razorpay.client.js";
import Payment from "./payment.model.js";
import Bill from "../bill/bill.model.js";

export const initiatePayment = async (req, res) => {
  const bill = await Bill.findById(req.body.billId);
  if (!bill || bill.status === "paid")
    return res.status(400).json({ message: "Invalid bill" });

  const order = await razorpay.orders.create({
    amount: bill.amount * 100,
    currency: "INR"
  });

  const payment = await Payment.create({
    userId: req.user.userId,
    billId: bill._id,
    amount: bill.amount,
    razorpayOrderId: order.id
  });

  res.json({ order, paymentId: payment._id });
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      message: "Missing Razorpay payment fields",
      received: req.body
    });
  }

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  console.log("VERIFY BODY:", req.body);
  console.log("SIGN STRING:", body);
  console.log("EXPECTED:", expectedSignature);
  console.log("RECEIVED:", razorpay_signature);

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({
      message: "Signature mismatch"
    });
  }

  const payment = await Payment.findOneAndUpdate(
    { razorpayOrderId: razorpay_order_id },
    {
      status: "success",
      razorpayPaymentId: razorpay_payment_id,
      receiptUrl: `/api/v1/payments/receipt/${razorpay_payment_id}`
    },
    { new: true }
  );

  if (!payment) {
    return res.status(404).json({
      message: "Payment record not found"
    });
  }

  await Bill.findByIdAndUpdate(payment.billId, { status: "paid" });

  return res.json({ success: true, payment });
};
