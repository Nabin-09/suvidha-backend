import Payment from "./payment.model.js";

export const downloadReceipt = async (req, res) => {
  const { paymentId } = req.params;

  const payment = await Payment.findOne({
    razorpayPaymentId: paymentId
  });

  if (!payment) {
    return res.status(404).json({
      message: "Receipt not found"
    });
  }

  return res.json({
    receiptId: payment._id,
    amount: payment.amount,
    status: payment.status,
    date: payment.createdAt
  });
};
