import PDFDocument from "pdfkit";
import Payment from "./payment.model.js";

export const downloadReceipt = async (req, res) => {
  const { paymentId } = req.params;

  const payment = await Payment.findOne({
    razorpayPaymentId: paymentId
  }).populate("billId");

  if (!payment) {
    return res.status(404).json({ message: "Receipt not found" });
  }

  // 📄 Create PDF
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=receipt-${payment._id}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(20).text("SUVIDHA - Payment Receipt", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Receipt ID: ${payment._id}`);
  doc.text(`Payment ID: ${payment.razorpayPaymentId}`);
  doc.text(`Amount Paid: ₹${payment.amount}`);
  doc.text(`Status: ${payment.status}`);
  doc.text(`Date: ${payment.createdAt.toDateString()}`);
  doc.moveDown();

  doc.text(`Service: ${payment.billId?.serviceType || "N/A"}`);
  doc.text(`Bill ID: ${payment.billId?._id}`);

  doc.moveDown(2);
  doc.text("Thank you for using SUVIDHA.", { align: "center" });

  doc.end();
};
